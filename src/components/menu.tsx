import React, { } from 'react';
import styled from '@emotion/styled';
import Menu from 'antd/lib/menu';
import { MenuInfo } from 'rc-menu/lib/interface'

interface iProps {
  docsNameList: string[],
  currentDoc: string,
  setCurrentDoc: (docName:string) => void
}

export const MenuComponent = ({docsNameList, setCurrentDoc, currentDoc} :iProps) => {

  const onClickMenu = (e: MenuInfo) => {
    setCurrentDoc(String(e.key))
  }

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 48px;
  `
  const Title = styled.h1`
    font-size: 24px;
    width: 120px;
    min-width: 120px;
    color: #4090ff
  `

  return (
    <Container>
      <Title>日志爬虫</Title>
      <Menu  mode="horizontal" selectedKeys={[currentDoc]} onClick={onClickMenu} theme="dark" inlineCollapsed={false}>
        {
          docsNameList.map(docName => {
            return <Menu.Item key={docName}>{docName}</Menu.Item>
          })
        }
      </Menu>
    </Container>
  )
}
