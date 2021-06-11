
import { Layout, Menu } from "antd"
import React, { useEffect, useState } from "react"
import { MenuInfo } from 'rc-menu/lib/interface'
import { Content } from "antd/lib/layout/layout";
import styled from "@emotion/styled";

const { Sider } = Layout;

interface iProps {
  currentDoc: string;
}
interface Log {
  version:string;
  path:string;
  name:string;
  _id:string;
}

export const LogPage = ({currentDoc}: iProps) => {
  
  const [selectedKey, setSelectedKey] = useState('')
  const[logList, setLogList] = useState([''])

  const serviceUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetch(`/api/docs/${currentDoc}`,{
      method: 'GET'
    }).then(async res => {
      const logs = await res.json()
      let list: string[] = []
      logs.body.forEach((log: Log)=> {
        list.push(log.version)
      })
      setLogList(list)
      setSelectedKey(list[0])
    })
  }, [currentDoc])

  const onClickMenu = (e: MenuInfo) => {
    setSelectedKey(String(e.key))

    console.log(selectedKey)
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

          {logList.map(log => {
            return <Menu.Item key={log}>{currentDoc + " v" + log}</Menu.Item>
          })}
        </Menu>

      </Sider>
      <Content>
        <FrameContainer>
          <iframe src={`${serviceUrl}/documents/${currentDoc}/${currentDoc} v ${selectedKey}.html`} style={{height: '100%', width: '100%'}} title="更新日志"></iframe>
        </FrameContainer>
      </Content>
    </Layout>
  )
} 