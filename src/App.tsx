import React, { useEffect, useState } from 'react';
import './App.less';
import 'antd/dist/antd.less';
import { Layout } from 'antd';
import { MenuComponent } from './components/menu';
import { Header } from 'antd/lib/layout/layout';
import { LogPage } from './views/log-page';


function App() {

  interface Doc {
    _id: string;
    path: string;
    version: string;
    name: string;
  }
  interface iDocs {
    message: string;
    statusCode: string;
    body: Doc[]
  }
  const [docsNameList, setDocsNameList] = useState([""])

  const [currentDoc, setCurrentDoc] = useState("")

  useEffect(() => {
    const getDocsNameList = () => {
      let myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      })
      fetch(`/api/docs`,{
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
      }).then(async res => {
        const docsList: iDocs = await res.json()
        const docsNameListClone:string[] = []
        docsList.body.forEach(doc => {
          if(docsNameListClone.findIndex((item) => {return item === doc.name}) === -1) {
            docsNameListClone.push(doc.name)
          }
        })
        setDocsNameList(docsNameListClone)
        if(docsNameListClone.length > 0) {
          setCurrentDoc(docsNameListClone[0])
        }
      })
    }
    getDocsNameList()
  },[])

  return (
    <Layout>
      <Header>
        <MenuComponent docsNameList={docsNameList} setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}></MenuComponent>
      </Header>
      <LogPage currentDoc={currentDoc}></LogPage>
    </Layout>
  );
}

export default App;

