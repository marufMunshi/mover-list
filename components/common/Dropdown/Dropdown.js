import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

export function DropdownMenu({ name, items, linkClassName }) {
  const menu = () => {
    return (
      <Menu>
        {items.map((item, index) => (
          <Menu.Item key={index}>
            <a href={item.href}>{item.title}</a>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span className={`ant-dropdown-link ${linkClassName || ''}`}>
        {name} <DownOutlined />
      </span>
    </Dropdown>
  );
}

DropdownMenu.propTypes = {
  name: PropTypes.string.isRequired,
  linkClassName: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ),
};
