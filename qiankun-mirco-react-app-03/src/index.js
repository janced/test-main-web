import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let root = null;

function render(props) {
  const { container } = props;
  const targetElement = container ? container.querySelector('#root') : document.querySelector('#root');
  
  // 如果已经存在 root，先卸载
  if (root) {
    root.unmount();
  }
  
  // 创建新的 root
  root = ReactDOM.createRoot(targetElement);
  root.render(
    <React.StrictMode>
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
        <App />
      </Router>
    </React.StrictMode>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  if (root) {
    root.unmount();
    root = null;
  }
}
