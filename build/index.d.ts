import * as React from 'react';
export declare const getRootState: () => any;
export declare const createModel: (model: {
    state: object;
    actions?: object;
}) => {
    state: object;
    actions?: object;
};
export declare const Provider: {
    new (props: any): {
        render(): JSX.Element;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            stores: any;
            logger?: boolean;
        }>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callBack?: () => void): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{
            stores: any;
            logger?: boolean;
        }>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<{
            stores: any;
            logger?: boolean;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
};
export declare const connect: (mapStateToProps: any) => (Component: any) => (props: any) => JSX.Element;
