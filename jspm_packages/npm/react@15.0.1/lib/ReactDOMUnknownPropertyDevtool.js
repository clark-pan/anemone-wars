/* */ 
(function(process) {
  'use strict';
  var DOMProperty = require('./DOMProperty');
  var EventPluginRegistry = require('./EventPluginRegistry');
  var warning = require('fbjs/lib/warning');
  if (process.env.NODE_ENV !== 'production') {
    var reactProps = {
      children: true,
      dangerouslySetInnerHTML: true,
      key: true,
      ref: true
    };
    var warnedProperties = {};
    var warnUnknownProperty = function(name) {
      if (DOMProperty.properties.hasOwnProperty(name) || DOMProperty.isCustomAttribute(name)) {
        return;
      }
      if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
        return;
      }
      warnedProperties[name] = true;
      var lowerCasedName = name.toLowerCase();
      var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
      process.env.NODE_ENV !== 'production' ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?', name, standardName) : void 0;
      var registrationName = EventPluginRegistry.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry.possibleRegistrationNames[lowerCasedName] : null;
      process.env.NODE_ENV !== 'production' ? warning(registrationName == null, 'Unknown event handler property %s. Did you mean `%s`?', name, registrationName) : void 0;
    };
  }
  var ReactDOMUnknownPropertyDevtool = {
    onCreateMarkupForProperty: function(name, value) {
      warnUnknownProperty(name);
    },
    onSetValueForProperty: function(node, name, value) {
      warnUnknownProperty(name);
    },
    onDeleteValueForProperty: function(node, name) {
      warnUnknownProperty(name);
    }
  };
  module.exports = ReactDOMUnknownPropertyDevtool;
})(require('process'));
