import styled from 'styled-components';

const DashHeader = styled.div`
  .ant-layout-header {
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    min-height: 4.286rem;
    z-index: 11;
    box-shadow:
      0 2px 2px rgba(0, 0, 0, 0.02),
      0 1px 0 rgba(0, 0, 0, 0.02);
    height: 77px;
    padding: 0 16px;
    line-height: 60px;
    background: #ffffff;
  }
  .trigger {
    transform: rotate(90deg);
    margin-right: 1rem;
  }
  .menu-divider {
    position: relative;
  }
  .menu-divider:before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 1px;
    height: 100%;
    content: '';
    background-color: #f9f9f9;
  }
  .brand {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
  }
  .brand > svg {
    fill: ${(props) => props.theme.primaryColor};
  }
  .ant-menu {
    font-family: inherit;
    line-height: inherit;
    box-shadow: none;
    display: flex;
    border: 0;
    margin-bottom: 1px;
    align-items: center;
  }
  .ant-menu-item,
  .ant-menu-item,
  .ant-menu-submenu-title {
    padding: 0 1rem;
  }
  .ant-menu-item,
  .ant-menu-submenu {
    top: 0;
    margin: 0 !important;
    display: flex;
    align-items: center;
  }
  .nav-link {
    display: initial;
    color: inherit;
  }
  .ant-list-header,
  .ant-list-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .ant-menu-submenu-arrow {
    display: none !important;
  }
`;

// const Notification = styled.div`
//   .ant-list-item {
//     padding-left: 1rem;
//     padding-right: 1rem;
//   }
// `;

export default DashHeader;
