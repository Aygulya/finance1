// components/Header.js
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ onMenuClick }) => {
  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 16px', backgroundColor: '#001529' }}>
      <Button 
        icon={<MenuOutlined />} 
        type="text" 
        style={{ color: 'white' }} 
        onClick={onMenuClick}
      />
      <h1 style={{ color: 'white', marginLeft: '16px' }}>Финансовый План</h1>
    </Header>
  );
};

export default AppHeader;
