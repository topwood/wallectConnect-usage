import { Link, Outlet } from 'umi';
import React from 'react'
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">连接钱包（使用walletConnect）</Link>
        </li>
        <li>
          <Link to="/connectWithWagmi">连接钱包（使用wagmi）</Link>
        </li>
        <li>
          <Link to="/transfer">转账</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
