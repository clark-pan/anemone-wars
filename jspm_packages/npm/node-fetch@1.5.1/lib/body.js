/* */ 
(function(Buffer) {
  var convert = require('encoding').convert;
  var bodyStream = require('is-stream');
  var PassThrough = require('stream').PassThrough;
  var FetchError = require('./fetch-error');
  module.exports = Body;
  function Body(body, opts) {
    opts = opts || {};
    this.body = body;
    this.bodyUsed = false;
    this.size = opts.size || 0;
    this.timeout = opts.timeout || 0;
    this._raw = [];
    this._abort = false;
  }
  Body.prototype.json = function() {
    return this._decode().then(function(text) {
      return JSON.parse(text);
    });
  };
  Body.prototype.text = function() {
    return this._decode();
  };
  Body.prototype._decode = function() {
    var self = this;
    if (this.bodyUsed) {
      return Body.Promise.reject(new Error('body used already for: ' + this.url));
    }
    this.bodyUsed = true;
    this._bytes = 0;
    this._abort = false;
    this._raw = [];
    return new Body.Promise(function(resolve, reject) {
      var resTimeout;
      if (typeof self.body === 'string') {
        self._bytes = self.body.length;
        self._raw = [new Buffer(self.body)];
        return resolve(self._convert());
      }
      if (self.body instanceof Buffer) {
        self._bytes = self.body.length;
        self._raw = [self.body];
        return resolve(self._convert());
      }
      if (self.timeout) {
        resTimeout = setTimeout(function() {
          self._abort = true;
          reject(new FetchError('response timeout at ' + self.url + ' over limit: ' + self.timeout, 'body-timeout'));
        }, self.timeout);
      }
      self.body.on('error', function(err) {
        reject(new FetchError('invalid response body at: ' + self.url + ' reason: ' + err.message, 'system', err));
      });
      self.body.on('data', function(chunk) {
        if (self._abort || chunk === null) {
          return;
        }
        if (self.size && self._bytes + chunk.length > self.size) {
          self._abort = true;
          reject(new FetchError('content size at ' + self.url + ' over limit: ' + self.size, 'max-size'));
          return;
        }
        self._bytes += chunk.length;
        self._raw.push(chunk);
      });
      self.body.on('end', function() {
        if (self._abort) {
          return;
        }
        clearTimeout(resTimeout);
        resolve(self._convert());
      });
    });
  };
  Body.prototype._convert = function(encoding) {
    encoding = encoding || 'utf-8';
    var charset = 'utf-8';
    var res,
        str;
    if (this.headers.has('content-type')) {
      res = /charset=([^;]*)/i.exec(this.headers.get('content-type'));
    }
    if (!res && this._raw.length > 0) {
      for (var i = 0; i < this._raw.length; i++) {
        str += this._raw[i].toString();
        if (str.length > 1024) {
          break;
        }
      }
      str = str.substr(0, 1024);
    }
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === 'gb2312' || charset === 'gbk') {
        charset = 'gb18030';
      }
    }
    return convert(Buffer.concat(this._raw), encoding, charset).toString();
  };
  Body.prototype._clone = function(instance) {
    var pass;
    var body = instance.body;
    if (instance.bodyUsed) {
      throw new Error('cannot clone body after it is used');
    }
    if (bodyStream(body) && typeof body.getBoundary !== 'function') {
      pass = new PassThrough();
      body.pipe(pass);
      body = pass;
    }
    return body;
  };
  Body.Promise = global.Promise;
})(require('buffer').Buffer);
