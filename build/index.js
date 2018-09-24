var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import * as React from 'react';
import * as _ from 'lodash';
var context = React.createContext({});
var actions = {};
var logger = false;
var bindProvider;
var createProvider = function (Provider) {
    return /** @class */ (function (_super) {
        __extends(Root, _super);
        function Root(props) {
            var _this = _super.call(this, props) || this;
            bindProvider = _this;
            logger = _this.props.logger;
            var stores = _this.props.stores;
            var initState = {};
            if (typeof stores !== 'object') {
                throw new Error('Store not object');
            }
            else {
                if (Object.keys(stores).length === 0) {
                    throw new Error('Store must have model');
                }
            }
            for (var storeKey in stores) {
                if (typeof stores[storeKey].state === 'undefined') {
                    throw new Error('Model requrie state');
                }
                else {
                    initState[storeKey] = stores[storeKey].state;
                }
                if (typeof stores[storeKey].actions !== 'undefined') {
                    for (var _i = 0, _a = stores[storeKey].actions; _i < _a.length; _i++) {
                        var action = _a[_i];
                        if (typeof action !== 'function') {
                            throw Error('Action must be function');
                        }
                    }
                    actions[storeKey] = stores[storeKey].actions;
                }
            }
            _this.state = initState;
            return _this;
        }
        Root.prototype.render = function () {
            return (React.createElement(Provider, { value: this.state }, this.props.children));
        };
        return Root;
    }(React.PureComponent));
};
var createPureConsumer = function (Component, componentProps) {
    return /** @class */ (function (_super) {
        __extends(PureConsumer, _super);
        function PureConsumer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PureConsumer.prototype.shouldComponentUpdate = function (newProps) {
            var mapPreProps = this.props.mapStateToProps;
            var mapNewProps = newProps.mapStateToProps;
            return !_.isEqual(mapPreProps, mapNewProps);
        };
        PureConsumer.prototype.render = function () {
            var mapStateToProps = this.props.mapStateToProps;
            return React.createElement(Component, __assign({}, componentProps, mapStateToProps, { dispatch: dispatch }));
        };
        return PureConsumer;
    }(React.Component));
};
var createConsumer = function (Consumer) { return function (mapStateToProps) { return function (Component) {
    return function (props) {
        var PureComponent = createPureConsumer(Component, props);
        return (React.createElement(Consumer, null, function (state) {
            return (React.createElement(PureComponent, { mapStateToProps: mapStateToProps(state || {}) }));
        }));
    };
}; }; };
var dispatch = function (actionType, payload) { return __awaiter(_this, void 0, void 0, function () {
    var _a, modelName, preRootState, responseAction, nextState;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (typeof payload === 'undefined') {
                    throw Error('Action must have payload');
                }
                if (logger)
                    console.log('--> ACTION: %c' + actionType, "color: #000000; font-weight: bold");
                actionType = actionType.replace(/\//g, '.');
                if (!_.has(actions, actionType)) {
                    throw new Error('Action not found');
                }
                modelName = actionType.split('.')[0];
                preRootState = bindProvider.state;
                responseAction = _.get(actions, actionType)(preRootState, payload);
                if (!(typeof responseAction.then === 'function')) return [3 /*break*/, 2];
                return [4 /*yield*/, responseAction];
            case 1:
                responseAction = _b.sent();
                _b.label = 2;
            case 2:
                if (typeof responseAction === 'undefined' || typeof responseAction !== 'object') {
                    throw new Error('ACtion must be return object');
                }
                nextState = Object.assign({}, preRootState, (_a = {},
                    _a[modelName] = __assign({}, preRootState[modelName], responseAction),
                    _a));
                bindProvider.setState(nextState);
                if (logger)
                    console.log('  %cprev state ', "color: #708090; font-weight: bold", preRootState);
                if (logger)
                    console.log('  %cparams     ', "color: #0000FF; font-weight: bold", payload);
                if (logger)
                    console.log('  %cnext state ', "color: #008000; font-weight: bold", nextState);
                return [2 /*return*/];
        }
    });
}); };
export var getRootState = function () {
    return bindProvider.state;
};
export var createModel = function (model) {
    return model;
};
export var Provider = createProvider(context.Provider);
export var connect = createConsumer(context.Consumer);
