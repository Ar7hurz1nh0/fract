import{options as e}from"/static/-/preact.js";var c,r,p,i=0,h=[],H=e.__r,d=e.diffed,y=e.__c,E=e.unmount;function a(_,n){e.__h&&e.__h(r,_,i||n),i=0;var u=r.__H||(r.__H={__:[],__h:[]});return _>=u.__.length&&u.__.push({}),u.__[_]}function b(_){return i=1,g(q,_)}function g(_,n,u){var t=a(c++,2);return t.t=_,t.__c||(t.__c=r,t.__=[u?u(n):q(void 0,n),function(o){var f=t.t(t.__[0],o);t.__[0]!==f&&(t.__=[f,t.__[1]],t.__c.setState({}))}]),t.__}function x(_,n){var u=a(c++,3);!e.__s&&l(u.__H,n)&&(u.__=_,u.__H=n,r.__H.__h.push(u))}function A(_,n){var u=a(c++,4);!e.__s&&l(u.__H,n)&&(u.__=_,u.__H=n,r.__h.push(u))}function D(_){return i=5,m(function(){return{current:_===void 0?null:_}},[])}function C(_,n,u){i=6,A(function(){typeof _=="function"?_(n()):_&&(_.current=n())},u==null?u:u.concat(_))}function m(_,n){var u=a(c++,7);return l(u.__H,n)?(u.__H=n,u.__h=_,u.__=_()):u.__}function T(_,n){return i=8,m(function(){return _},n)}function V(_){var n=r.context[_.__c],u=a(c++,9);return u.__c=_,n?(u.__==null&&(u.__=!0,n.sub(r)),n.props.value):_.__}function j(_,n){e.useDebugValue&&e.useDebugValue(n?n(_):_)}function k(_){var n=a(c++,10),u=b();return n.__=_,r.componentDidCatch||(r.componentDidCatch=function(t){n.__&&n.__(t),u[1](t)}),[u[0],function(){u[1](void 0)}]}function R(){h.some(function(_){if(_.__P)try{_.__H.__h.forEach(s),_.__H.__h.forEach(v),_.__H.__h=[]}catch(n){return _.__H.__h=[],e.__e(n,_.__v),!0}}),h=[]}e.__r=function(_){H&&H(_),c=0;var n=(r=_.__c).__H;n&&(n.__h.forEach(s),n.__h.forEach(v),n.__h=[])},e.diffed=function(_){d&&d(_);var n=_.__c;n&&n.__H&&n.__H.__h.length&&(h.push(n)!==1&&p===e.requestAnimationFrame||((p=e.requestAnimationFrame)||function(u){var t,o=function(){clearTimeout(f),F&&cancelAnimationFrame(t),setTimeout(u)},f=setTimeout(o,100);F&&(t=requestAnimationFrame(o))})(R))},e.__c=function(_,n){n.some(function(u){try{u.__h.forEach(s),u.__h=u.__h.filter(function(t){return!t.__||v(t)})}catch(t){n.some(function(o){o.__h&&(o.__h=[])}),n=[],e.__e(t,u.__v)}}),y&&y(_,n)},e.unmount=function(_){E&&E(_);var n=_.__c;if(n&&n.__H)try{n.__H.__.forEach(s)}catch(u){e.__e(u,n.__v)}};var F=typeof requestAnimationFrame=="function";function s(_){typeof _.u=="function"&&_.u()}function v(_){_.u=_.__()}function l(_,n){return!_||n.some(function(u,t){return u!==_[t]})}function q(_,n){return typeof n=="function"?n(_):n}export{T as useCallback,V as useContext,j as useDebugValue,x as useEffect,k as useErrorBoundary,C as useImperativeHandle,A as useLayoutEffect,m as useMemo,g as useReducer,D as useRef,b as useState};export default null;
