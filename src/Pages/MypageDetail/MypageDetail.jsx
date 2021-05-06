import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { ORDER_LIST } from '../../Config'

function MypageDetail(props) {
  const [detailData, setDetailData] = useState()

  // order아이디값에 따른 데이터
  useEffect(() => {
    axios
      .get(`${ORDER_LIST}/${props.match.params.id}`)
      .then((res) => setDetailData(res.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <DetailPage>
      <DetailPageContainer>
        <DetailItemId>{detailData?.id}</DetailItemId>
        <DetailItemName>{detailData?.itemName}</DetailItemName>
      </DetailPageContainer>
    </DetailPage>
  )
}

export default MypageDetail

const DetailPage = styled.div`
  ${(props) => props.theme.flexStyle}
  margin-top: 50px;
`

const DetailPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1000px;
`

const DetailItemId = styled.span`
  margin: 0 15px;
  cursor: pointer;
  flex: 3;
  text-align: center;
`

const DetailItemName = styled(DetailItemId)`
  flex: 7;
`
