import * as React from 'react';
import * as _ from 'lodash';

const context = React.createContext({});
const actions = {};

let logger = false;
let bindProvider;

const createProvider = (Provider) =>
    class Root extends React.PureComponent<{
        stores: any
        logger?: boolean
    }> {
        constructor(props) {
            super(props);
            bindProvider = this;

            logger = this.props.logger;

            const stores         = this.props.stores;
            const initState: any = {};

            if (typeof stores !== 'object') {
                throw new Error('Store not object');
            } else {
                if (Object.keys(stores).length === 0) {
                    throw new Error('Store must have model');
                }
            }

            for (let storeKey in stores) {
                if (typeof stores[storeKey].state === 'undefined') {
                    throw new Error('Model requrie state');
                } else {
                    initState[storeKey] = stores[storeKey].state;
                }

                if (typeof stores[storeKey].actions !== 'undefined') {
                    for (let action of stores[storeKey].actions) {
                        if (typeof action !== 'function') {
                            throw Error('Action must be function');
                        }
                    }
                    actions[storeKey] = stores[storeKey].actions;
                }
            }

            this.state = initState;
        }

        render() {
            return (
                <Provider value={this.state}>{this.props.children}</Provider>
            );
        }
    };

const createPureConsumer = (Component, componentProps) =>
    class PureConsumer extends React.Component<any> {

        shouldComponentUpdate(newProps) {
            let mapPreProps = this.props.mapStateToProps;
            let mapNewProps = newProps.mapStateToProps;

            return !_.isEqual(mapPreProps, mapNewProps);
        }

        render() {
            const { mapStateToProps } = this.props;
            return <Component {...componentProps} {...mapStateToProps} dispatch={dispatch} />;
        }
    };

const createConsumer = Consumer => mapStateToProps => Component =>
    props => {
        const PureComponent = createPureConsumer(Component, props);
        return (
            <Consumer>
            {
                state => {
                    return (
                        <PureComponent mapStateToProps={mapStateToProps(state || {})} />
                    );
                }
            }
            </Consumer>
        );
    };


const dispatch = async (actionType: string, payload) => {

    if (typeof payload === 'undefined') {
        throw Error('Action must have payload');
    }

    if (logger) console.log(
        '--> ACTION: %c' + actionType,
        `color: #000000; font-weight: bold`
    );

    actionType = actionType.replace(/\//g, '.');
    if (!_.has(actions, actionType)) {
        throw new Error('Action not found');
    }

    let modelName = actionType.split('.')[0];

    let preRootState = bindProvider.state;

    let responseAction = _.get(actions, actionType)(preRootState, payload);

    if (typeof responseAction.then === 'function') {
        responseAction = await responseAction;
    }

    if (typeof responseAction === 'undefined' || typeof responseAction !== 'object') {
        throw new Error('ACtion must be return object');
    }

    let nextState = Object.assign({}, preRootState, {
        [modelName]: {
            ...preRootState[modelName],
            ...responseAction
        }
    });

    bindProvider.setState(nextState);

    if (logger) console.log(
        '  %cprev state ',
        `color: #708090; font-weight: bold`,
        preRootState
    );
    if (logger) console.log(
        '  %cparams     ',
        `color: #0000FF; font-weight: bold`,
        payload
    );
    if (logger) console.log(
        '  %cnext state ',
        `color: #008000; font-weight: bold`,
        nextState
    );

    return;
};

export const getRootState = () => {
    return bindProvider.state;
};

export const createModel = (model: {
    state: object
    actions?: object
}) => {
    return model;
};

export const Provider = createProvider(context.Provider);
export const connect  = createConsumer(context.Consumer);