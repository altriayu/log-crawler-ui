
import { Layout, Menu } from "antd"
import React, { useEffect, useState } from "react"
import { MenuInfo } from 'rc-menu/lib/interface'
import { Content } from "antd/lib/layout/layout";
import styled from "@emotion/styled";

const { Sider } = Layout;

interface iProps {
  currentDoc: string,
}

export const LogPage = ({currentDoc}: iProps) => {
  
  const [selectedKey, setSelectedKey] = useState('')
  const[logList, setLogList] = useState([])

  useEffect(() => {
    let myHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    })
    fetch(`/docs/${currentDoc}`,{
      method: 'GET',
      headers: myHeaders,
      mode: 'cors'
    }).then(async res => {
      const logs = await res.json()
      setLogList(logs)
    })
  }, [])

  const onClickMenu = (e: MenuInfo) => {
    setSelectedKey(String(e.key))
  }

  const FrameContainer = styled.div`
    margin: 5px;
    height: calc(100% - 10px);
    width: calc(100% - 10px);
    color: #000000;
  `

  return (
    <Layout>
      <Sider style={{height: 'inherit'}}>
        <Menu mode="vertical" style={{ height: '100%'}}  defaultSelectedKeys={[selectedKey]} onClick={onClickMenu} >
          <Menu.Item key="a">
            Navigation One
          </Menu.Item>
          <Menu.Item key="b">
            Navigation One
          </Menu.Item>
          <Menu.Item key="c">
            Navigation One
          </Menu.Item>
        </Menu>

      </Sider>
      <Content>
        <FrameContainer>
          <iframe src="http://localhost:3005/docs/chrome/chrome v 80.html" style={{height: '100%', width: '100%'}} title="更新日志"></iframe>
        </FrameContainer>
      </Content>
    </Layout>
  )
} 