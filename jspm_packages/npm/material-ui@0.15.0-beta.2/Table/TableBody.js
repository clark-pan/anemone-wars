/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, "__esModule", {value: true});
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = require('simple-assign');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _Checkbox = require('../Checkbox/index');
  var _Checkbox2 = _interopRequireDefault(_Checkbox);
  var _TableRowColumn = require('./TableRowColumn');
  var _TableRowColumn2 = _interopRequireDefault(_TableRowColumn);
  var _ClickAwayListener = require('../internal/ClickAwayListener');
  var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var TableBody = function(_React$Component) {
    _inherits(TableBody, _React$Component);
    function TableBody() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, TableBody);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableBody)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {selectedRows: _this.calculatePreselectedRows(_this.props)}, _this.handleClickAway = function() {
        if (_this.props.deselectOnClickaway && _this.state.selectedRows.length) {
          _this.setState({selectedRows: []});
          if (_this.props.onRowSelection) {
            _this.props.onRowSelection([]);
          }
        }
      }, _this.onRowClick = function(event, rowNumber) {
        event.stopPropagation();
        if (_this.props.selectable) {
          window.getSelection().removeAllRanges();
          _this.processRowSelection(event, rowNumber);
        }
      }, _this.onCellClick = function(event, rowNumber, columnNumber) {
        event.stopPropagation();
        if (_this.props.onCellClick)
          _this.props.onCellClick(rowNumber, _this.getColumnId(columnNumber), event);
      }, _this.onCellHover = function(event, rowNumber, columnNumber) {
        if (_this.props.onCellHover)
          _this.props.onCellHover(rowNumber, _this.getColumnId(columnNumber), event);
        _this.onRowHover(event, rowNumber);
      }, _this.onCellHoverExit = function(event, rowNumber, columnNumber) {
        if (_this.props.onCellHoverExit)
          _this.props.onCellHoverExit(rowNumber, _this.getColumnId(columnNumber), event);
        _this.onRowHoverExit(event, rowNumber);
      }, _this.onRowHover = function(event, rowNumber) {
        if (_this.props.onRowHover)
          _this.props.onRowHover(rowNumber);
      }, _this.onRowHoverExit = function(event, rowNumber) {
        if (_this.props.onRowHoverExit)
          _this.props.onRowHoverExit(rowNumber);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(TableBody, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.props.allRowsSelected && !nextProps.allRowsSelected) {
          this.setState({selectedRows: this.state.selectedRows.length > 0 ? [this.state.selectedRows[this.state.selectedRows.length - 1]] : []});
        } else {
          this.setState({selectedRows: this.calculatePreselectedRows(nextProps)});
        }
      }
    }, {
      key: 'createRows',
      value: function createRows() {
        var _this2 = this;
        var numChildren = _react2.default.Children.count(this.props.children);
        var rowNumber = 0;
        var handlers = {
          onCellClick: this.onCellClick,
          onCellHover: this.onCellHover,
          onCellHoverExit: this.onCellHoverExit,
          onRowHover: this.onRowHover,
          onRowHoverExit: this.onRowHoverExit,
          onRowClick: this.onRowClick
        };
        return _react2.default.Children.map(this.props.children, function(child) {
          if (_react2.default.isValidElement(child)) {
            var _ret2 = function() {
              var props = {
                displayRowCheckbox: _this2.props.displayRowCheckbox,
                hoverable: _this2.props.showRowHover,
                selected: _this2.isRowSelected(rowNumber),
                striped: _this2.props.stripedRows && rowNumber % 2 === 0,
                rowNumber: rowNumber++
              };
              var checkboxColumn = _this2.createRowCheckboxColumn(props);
              if (rowNumber === numChildren) {
                props.displayBorder = false;
              }
              var children = [checkboxColumn];
              _react2.default.Children.forEach(child.props.children, function(child) {
                children.push(child);
              });
              return {v: _react2.default.cloneElement(child, _extends({}, props, handlers), children)};
            }();
            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object")
              return _ret2.v;
          }
        });
      }
    }, {
      key: 'createRowCheckboxColumn',
      value: function createRowCheckboxColumn(rowProps) {
        if (!this.props.displayRowCheckbox)
          return null;
        var key = rowProps.rowNumber + '-cb';
        var checkbox = _react2.default.createElement(_Checkbox2.default, {
          ref: 'rowSelectCB',
          name: key,
          value: 'selected',
          disabled: !this.props.selectable,
          checked: rowProps.selected
        });
        return _react2.default.createElement(_TableRowColumn2.default, {
          key: key,
          columnNumber: 0,
          style: {width: 24}
        }, checkbox);
      }
    }, {
      key: 'calculatePreselectedRows',
      value: function calculatePreselectedRows(props) {
        var preSelectedRows = [];
        if (props.selectable && props.preScanRows) {
          (function() {
            var index = 0;
            _react2.default.Children.forEach(props.children, function(child) {
              if (_react2.default.isValidElement(child)) {
                if (child.props.selected && (preSelectedRows.length === 0 || props.multiSelectable)) {
                  preSelectedRows.push(index);
                }
                index++;
              }
            });
          })();
        }
        return preSelectedRows;
      }
    }, {
      key: 'isRowSelected',
      value: function isRowSelected(rowNumber) {
        if (this.props.allRowsSelected) {
          return true;
        }
        for (var i = 0; i < this.state.selectedRows.length; i++) {
          var selection = this.state.selectedRows[i];
          if ((typeof selection === 'undefined' ? 'undefined' : _typeof(selection)) === 'object') {
            if (this.isValueInRange(rowNumber, selection))
              return true;
          } else {
            if (selection === rowNumber)
              return true;
          }
        }
        return false;
      }
    }, {
      key: 'isValueInRange',
      value: function isValueInRange(value, range) {
        if (!range)
          return false;
        if (range.start <= value && value <= range.end || range.end <= value && value <= range.start) {
          return true;
        }
        return false;
      }
    }, {
      key: 'processRowSelection',
      value: function processRowSelection(event, rowNumber) {
        var selectedRows = this.state.selectedRows;
        if (event.shiftKey && this.props.multiSelectable && selectedRows.length) {
          var lastIndex = selectedRows.length - 1;
          var lastSelection = selectedRows[lastIndex];
          if ((typeof lastSelection === 'undefined' ? 'undefined' : _typeof(lastSelection)) === 'object') {
            lastSelection.end = rowNumber;
          } else {
            selectedRows.splice(lastIndex, 1, {
              start: lastSelection,
              end: rowNumber
            });
          }
        } else if ((event.ctrlKey && !event.metaKey || event.metaKey && !event.ctrlKey) && this.props.multiSelectable) {
          var idx = selectedRows.indexOf(rowNumber);
          if (idx < 0) {
            var foundRange = false;
            for (var i = 0; i < selectedRows.length; i++) {
              var range = selectedRows[i];
              if ((typeof range === 'undefined' ? 'undefined' : _typeof(range)) !== 'object')
                continue;
              if (this.isValueInRange(rowNumber, range)) {
                var _selectedRows;
                foundRange = true;
                var values = this.splitRange(range, rowNumber);
                (_selectedRows = selectedRows).splice.apply(_selectedRows, [i, 1].concat(_toConsumableArray(values)));
              }
            }
            if (!foundRange)
              selectedRows.push(rowNumber);
          } else {
            selectedRows.splice(idx, 1);
          }
        } else {
          if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
            selectedRows = [];
          } else {
            selectedRows = [rowNumber];
          }
        }
        this.setState({selectedRows: selectedRows});
        if (this.props.onRowSelection)
          this.props.onRowSelection(this.flattenRanges(selectedRows));
      }
    }, {
      key: 'splitRange',
      value: function splitRange(range, splitPoint) {
        var splitValues = [];
        var startOffset = range.start - splitPoint;
        var endOffset = range.end - splitPoint;
        splitValues.push.apply(splitValues, _toConsumableArray(this.genRangeOfValues(splitPoint, startOffset)));
        splitValues.push.apply(splitValues, _toConsumableArray(this.genRangeOfValues(splitPoint, endOffset)));
        return splitValues;
      }
    }, {
      key: 'genRangeOfValues',
      value: function genRangeOfValues(start, offset) {
        var values = [];
        var dir = offset > 0 ? -1 : 1;
        while (offset !== 0) {
          values.push(start + offset);
          offset += dir;
        }
        return values;
      }
    }, {
      key: 'flattenRanges',
      value: function flattenRanges(selectedRows) {
        var rows = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
          for (var _iterator = selectedRows[Symbol.iterator](),
              _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var selection = _step.value;
            if ((typeof selection === 'undefined' ? 'undefined' : _typeof(selection)) === 'object') {
              var values = this.genRangeOfValues(selection.end, selection.start - selection.end);
              rows.push.apply(rows, [selection.end].concat(_toConsumableArray(values)));
            } else {
              rows.push(selection);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        return rows.sort();
      }
    }, {
      key: 'getColumnId',
      value: function getColumnId(columnNumber) {
        var columnId = columnNumber;
        if (this.props.displayRowCheckbox)
          columnId--;
        return columnId;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var className = _props.className;
        var style = _props.style;
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var rows = this.createRows();
        return _react2.default.createElement(_ClickAwayListener2.default, {onClickAway: this.handleClickAway}, _react2.default.createElement('tbody', {
          className: className,
          style: prepareStyles((0, _simpleAssign2.default)({}, style))
        }, rows));
      }
    }]);
    return TableBody;
  }(_react2.default.Component);
  TableBody.muiName = 'TableBody';
  TableBody.propTypes = {
    allRowsSelected: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    className: _react2.default.PropTypes.string,
    deselectOnClickaway: _react2.default.PropTypes.bool,
    displayRowCheckbox: _react2.default.PropTypes.bool,
    multiSelectable: _react2.default.PropTypes.bool,
    onCellClick: _react2.default.PropTypes.func,
    onCellHover: _react2.default.PropTypes.func,
    onCellHoverExit: _react2.default.PropTypes.func,
    onRowHover: _react2.default.PropTypes.func,
    onRowHoverExit: _react2.default.PropTypes.func,
    onRowSelection: _react2.default.PropTypes.func,
    preScanRows: _react2.default.PropTypes.bool,
    selectable: _react2.default.PropTypes.bool,
    showRowHover: _react2.default.PropTypes.bool,
    stripedRows: _react2.default.PropTypes.bool,
    style: _react2.default.PropTypes.object
  };
  TableBody.defaultProps = {
    allRowsSelected: false,
    deselectOnClickaway: true,
    displayRowCheckbox: true,
    multiSelectable: false,
    preScanRows: true,
    selectable: true,
    style: {}
  };
  TableBody.contextTypes = {muiTheme: _react2.default.PropTypes.object.isRequired};
  exports.default = TableBody;
})(require('process'));
