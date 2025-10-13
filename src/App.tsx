import React, {useState} from 'react';
import JsFilter from "./app/JsFilter";
import {Condition, DataSet} from "./app/type/Types";

function App() {

    const data= [
        {id:1, name:'김길동'},
        {id:2, name:'박순자'},
        {id:3, name:'임하수'},
        {id:4, name:'황신혜'},
        {id:5, name:'최제수'},
        {id:6, name:'박엄길'},
        {id:7, name:'윤상호'},
        {id:8, name:'최이영'},
        {id:9, name:'한국영'},
        {id:10, name:'이재용'},
        {id:11, name:'강하늘'},
    ]

    const dept =[
        {id:2, name:'개발부', parentId:1, children:[
                {id:9, name:'개발1팀', parentId:2, children:[
                        {id:20, name:'개발1-1팀', parentId:9,
                            children:[
                                {id:23, name:'개발1-1-1팀', parentId:20,  children:[
                                        {id:30, name:'개발1-1-1-1팀', parentId:23},
                                        {id:31, name:'개발1-1-2-1팀', parentId:23},
                                        {id:32, name:'개발1-1-3-1팀', parentId:23},
                                    ]},
                                {id:24, name:'개발1-1-2팀', parentId:20},
                                {id:25, name:'개발1-1-3팀', parentId:20},
                            ]},
                        {id:21, name:'개발1-2팀', parentId:9,children:[
                                {id:33, name:'개발1-2-1팀', parentId:21,  children:[
                                        {id:36, name:'개발1-2-1-1팀', parentId:33},
                                        {id:37, name:'개발1-2-1-2팀', parentId:33},
                                        {id:38, name:'개발1-2-1-3팀', parentId:33},
                                    ]},
                                {id:34, name:'개발1-2-2팀', parentId:21},
                                {id:35, name:'개발1-2-3팀', parentId:21},
                            ]},
                        {id:22, name:'개발1-3팀', parentId:9},
                    ]},
                {id:10, name:'개발2팀', parentId:2},
                {id:11, name:'개발3팀', parentId:2},
                {id:12, name:'개발4팀', parentId:2},
            ]},
        {id:3, name:'영업부', parentId:1,children:[
                {id:13, name:'영업1팀', parentId:3},
                {id:14, name:'영업2팀', parentId:3},
                {id:15, name:'영업3팀', parentId:3},
                {id:16, name:'영업4팀', parentId:3},
            ]},
        {id:4, name:'기획부', parentId:1, children:[
                {id:17, name:'기획2팀', parentId:4},
                {id:18, name:'기획3팀', parentId:4},
                {id:19, name:'기획4팀', parentId:4},
            ]},
        {id:5, name:'경영부', parentId:1},
        {id:6, name:'인사부', parentId:1},
        {id:7, name:'재무부', parentId:1},
        {id:8, name:'사업부1', parentId:1},
        {id:26, name:'사업부2', parentId:1},
        {id:27, name:'사업부3', parentId:1},
        {id:28, name:'사업부4', parentId:1},
        {id:29, name:'사업부5', parentId:1},
    ]

    const datasetUser ={
        content : data
    }

    const datasetDept ={
        content : dept
    }
    const [test, setTest] = useState<DataSet>(datasetUser);

    const fetchUser = async (): Promise<DataSet> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(datasetUser), 300); // 실제 axios 호출 가능
        });
    };

    const fetchDept = async (): Promise<DataSet> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(datasetDept), 300);
        });
    };


    const conditions:Condition[] =[
        {key:'creator', label:'등록자', vessel:'ARRAY', api: fetchUser },
        {key:'searchTxt', label:'검색어', type:'TEXT', vessel:'TEXT', target:[{key:'title', name:'제목'},{key:'number', name:'번호'}]},
        {key:'updater', label:'수정자',  api: fetchUser },
        {key:'createdAt', label:'등록일', type:'DATE', },
        {key:'department', label:'부서', type: 'RECURSIVE', api: fetchDept},
    ]

  return (
    <div className="App" style={{padding:'20px'}}>
      <JsFilter conditions={conditions} onValueChange={k=>console.log(k)} />
    </div>
  );
}

export default App;
