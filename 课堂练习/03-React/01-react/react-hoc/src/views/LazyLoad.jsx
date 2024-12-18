import React, { Component, Suspense } from 'react';
const Child = React.lazy(() => import('../components/Child'));
export default class LazyLoad extends Component {
    render() {
        return (
            <Suspense fallback={<div>loading....</div>}>
                <Child></Child>
            </Suspense>
        );
    }
}
