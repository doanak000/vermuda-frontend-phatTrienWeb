import React, { useState } from 'react'
import { Modal } from 'antd'
import TableCustom, {
  CellContentRender,
  ColTitleRender
} from '../../components/TableCustom/TableCustom'
import { useSelector } from 'react-redux'
import { selectTranslation } from '../language/languageSlice'
import { COLUMN_TYPE } from '../../constants/common'
const ModelDetailsQr = (props) => {
  const { setIsOpenDetails, record } = props
  const translation = useSelector(selectTranslation)
  const [currentPage, setCurrentPage] = useState(1)

  console.log(currentPage)

  const onCloseForm = () => {
    setIsOpenDetails(false)
  }
  const onChangePage = (value) => {
    setCurrentPage(value.current)
  }
  const columns = [
    {
      title: ColTitleRender(translation.TEXT_INDEX),
      dataIndex: 'idx',
      ellipsis: true,
      width: 60,
      align: 'center'
    },
    {
      title: ColTitleRender(translation.TXT_PRIZE),
      dataIndex: 'prizeName',
      render: (value) => CellContentRender(value),
      width: 300
    },
    {
      title: ColTitleRender(translation.TEXT_RANK_PRIZE),
      dataIndex: 'rank',
      render: (value) => CellContentRender(value, COLUMN_TYPE.NUMBER),
      width: 200
    },
    {
      title: ColTitleRender(translation.TXT_AMOUNT),
      dataIndex: 'amountCode',
      ellipsis: true,
      render: (value) => CellContentRender(value.length, COLUMN_TYPE.NUMBER),
      width: 150
    }
  ]

  const dataSource =
    record?.prizes.map((itemData, idx) => ({
      idx: itemData?.rank,
      prizeName: itemData?.name,
      rank: itemData?.rank,
      amountCode: itemData?.serialCodes
    })) || []

  return (
    <Modal
      title={<h2>{record?.name}</h2>}
      onCancel={() => onCloseForm()}
      visible={true}
      footer={false}
      width={'50vw'}
    >
      <TableCustom
        onChange={(value) => onChangePage(value)}
        dataSource={dataSource?.sort((a, b) => (b.rank > a.rank ? -1 : 1))}
        columns={columns}
        total={record?.prizes?.length || 0}
        showCheckbox={false}
        scroll={{ y: 'auto', x: '100%' }}
      />
    </Modal>
  )
}

export default ModelDetailsQr
