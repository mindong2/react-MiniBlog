/* eslint-disable */

import {useState} from 'react';
import './App.css';

function App() {
  /* 일반 변수와 state의 차이 -> 일반변수가 바뀌면 재렌더링X state가 바뀌면 재렌더링
     자주 변경될것 같을때 state 사용하기
  */
  // a = 저장한 state, b = state변경 도와주는 함수
  let [listTitle, setListTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '리액트가 리액트된다']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [ModalNum,setModalNum] = useState(0);
  let [InputVal, setInputVal] = useState('');
  const sortFn = () => {
    let sortTitle = [...listTitle].sort();
    setListTitle(sortTitle);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{color:'#fff', fontSize: '28px'}}>ReactBlog</h4>
      </div>

      {/* 타이틀 바꾸는 버튼 */}
    
      <button onClick={() => {
        // Array, Object는 Reference data type 이므로 깊은복사가 필요하다. spread후 다시 씌우면 주소 달라짐.
        let copy = [...listTitle];
        copy[0] = '여자 코트 추천';
        setListTitle(copy);
      }}>타이틀 변경</button>

      {/* 타이틀 가나다순 정렬 버튼 */}
      <button onClick={sortFn}>정렬하기</button>

      {/* <div className ="list">
        <h2>{ listTitle[0] } 
          <span style={{cursor: 'pointer'}} onClick={() => setLike(like+1)}>👍 </span> 
          {like} 
        </h2>
        <p>2월 17일 발행</p>
      </div> */}

      { listTitle.map((v, i) =>{
        return(
          <div className ="list" key={i}>
            <h2 onClick={()=> {
              setModal(!modal);
              setModalNum(i);
            } }>{ v }</h2>
            
            <span style={{cursor: 'pointer'}} onClick={() => {
              let addLike = [...like];
              addLike[i]++;
              setLike(addLike);
            }}>👍 {like[i]} </span>

            <button onClick={()=>{
              let deleteTitle = [...listTitle];
              deleteTitle.splice(i, 1);
              setListTitle(deleteTitle);
            }}>삭제</button>

            <p>2월 17일 발행</p>
          </div>
        )
      })
      }

      <input type = "text" className='add_input' onChange={(e) => {setInputVal(e.target.value);}} />
      <button onClick={() => {
        if(InputVal !== ''){
          let addTitle = [...listTitle];
          let addNum = [...like];
          addTitle.unshift(InputVal);
          addNum.unshift(0);
          setListTitle( addTitle );
          setLike(addNum);
          setInputVal('');
          document.querySelector('.add_input').value = '';
        }else{
          alert('제목을 입력하세요!');
        }
      }}>글 추가</button>

      {
        modal ? <Modal modalNum = { ModalNum } listTitle = { listTitle } setListTitle = { setListTitle }></Modal> : null
      }

      {/* 동적인 UI 3step
        1. html, css 미리 디자인 완성
        2. UI 현재 상태를 state로 저장
        3. state에 따라 UI가 어떻게 보일지 작성
      */}
    </div>
  );
}

// 리액트에서의 props -> <자식 작명 = {state이름}> -> props 파라미터 등록 후 props.작명
// 컴포넌트 -> function 생성 return () 안에 사용할 html 

const Modal = (props) => {
  return(
    <div className='modal'>
      <h4>{props.listTitle[props.modalNum]}</h4>
      <p>날짜</p>
      <p>상세 내용</p>
      <button onClick={() => {
        let copyListTitle = [...props.listTitle];
        copyListTitle[props.modalNum] = '여자 코트 추천';
        props.setListTitle(copyListTitle);
      }}>글수정</button>
    </div>
  )
}

export default App;
