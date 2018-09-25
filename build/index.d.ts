import * as React from 'react';
declare class Provider extends React.PureComponent<{
    stores: any;
    logger?: boolean;
}> {
    constructor(props: any);
    render(): JSX.Element;
}
declare const connect: (mapStateToProps?: (state: any) => any) => (Component: any) => (props: any) => JSX.Element;
declare const getRootState: () => any;
declare const createModel: (model: {
    state: object;
    actions?: object;
}) => {
    state: object;
    actions: object;
};
export { Provider, createModel, getRootState, connect };
