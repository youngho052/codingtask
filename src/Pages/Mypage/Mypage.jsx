import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ORDER_LIST } from '../../Config'
import { PAGE_DATA } from './Data/PageData'
import { useHistory } from 'react-router'

function Mypage() {
  const [item, setItem] = useState()
  const history = useHistory()

  // 처음 받아오는 데이터 1초뒤 받을 수 있게끔 설정
  const data = () => {
    setTimeout(function () {
      axios
        .get(`${ORDER_LIST}?page=0`)
        .then((res) => setItem(res.data.content))
        .catch((error) => console.log(error))
    }, 1000)
  }

  useEffect(() => {
    data()
  }, [])

  // page 넘어갈때 받아오는 데이터
  const pageHandle = (id) => {
    axios
      .get(`${ORDER_LIST}?page=${id}`)
      .then((res) => setItem(res.data.content))
      .catch((error) => console.log(error))
  }

  // 상세페이지 이동 핸들
  const routeHandle = (id) => {
    history.push(`/mypage/order/${id}`)
  }

  return (
    <>
      <ItemList>
        <ItemListContainer>
          {item?.map((item, index) => {
            const { id, itemName } = item
            return (
              <Item key={index} onClick={() => routeHandle(id)}>
                <ItemId>{id}</ItemId>
                <ItemName>{itemName}</ItemName>
              </Item>
            )
          })}
        </ItemListContainer>
      </ItemList>
      <PageNation>
        <PageContainer>
          {PAGE_DATA.map((item, index) => {
            const { id, pageNum } = item
            return (
              <span key={index} onClick={() => pageHandle(id)}>
                {pageNum}
              </span>
            )
          })}
        </PageContainer>
      </PageNation>
    </>
  )
}

export default Mypage

const ItemList = styled.div`
  ${(props) => props.theme.flexStyle}
`

const ItemListContainer = styled.ul`
  width: 800px;
  margin: 0 auto;
`

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 25px auto;
  cursor: pointer;
`

const PageNation = styled.div`
  width: 1000px;
  margin: 35px auto;
`

const PageContainer = styled.div`
  ${(props) => props.theme.flexStyle}

  span {
    margin: 0 15px;
    cursor: pointer;
  }
`

const ItemId = styled.span`
  margin: 0 15px;
  cursor: pointer;
  flex: 3;
  text-align: center;
`

const ItemName = styled(ItemId)`
  flex: 7;
`
