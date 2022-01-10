import React, { useEffect, useState } from 'react'
import {
  TableListOfCode,
  WrapperListOfCode,
  WrapperRenderListOfCode,
  ListOfCodeModal,
  WrapperIconManagerGenerateCode,
  ButtonDetail
} from './ManageGenerate.style'
import { Form } from 'antd'
import { DeleteOutlined, MenuFoldOutlined } from '@ant-design/icons'
import {
  selectInfoCode,
  selectListOfCode
} from '../generateCode/generateCodeSliceQR'
import { useSelector } from 'react-redux'
import { EditableCell } from '../../helper/editTableCell'
import { ButtonDelete } from '../../components/InputCustom/ButtonCustom'

const EditableTable = (props) => {
  const keyIndex = props.keyIndex
  const [form] = Form.useForm()
  const listOfCode = useSelector(selectListOfCode)

  const [data, setData] = useState(null)
  const originData = listOfCode[keyIndex]?.map((item) => ({ ...item }))

  useEffect(() => {
    setData(originData)
  }, [keyIndex])
  const columns = [
    {
      title: '#',
      dataIndex: 'seri',
      width: '5%',
      editable: false
    },
    {
      title: 'Random Code',
      dataIndex: 'randomCode',
      width: '20%',
      editable: false
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      editable: true
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '20%',
      editable: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
      editable: true
    }
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'seri'
            ? 'number'
            : col.dataIndex === 'status'
            ? 'select'
            : col.dataIndex === 'date'
            ? 'date'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title
      })
    }
  })
  return (
    <Form form={form} component={false}>
      <TableListOfCode
        components={{
          body: {
            cell: EditableCell
          }
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          showSizeChanger: false
        }}
      />
      <ButtonDetail>EXPORT PDF</ButtonDetail>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}></div>
    </Form>
  )
}
const TableGenerateCode = () => {
  const [form] = Form.useForm()
  const infoCode = useSelector(selectInfoCode)
  const originData = []
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = (i) => {
    setKeyIndex(i)
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const [keyIndex, setKeyIndex] = useState()
  for (let i = 0; i < infoCode?.code?.length; i++) {
    originData.push({
      key: originData.length,
      userCreate: `user ${i}`,
      seri: originData.length + 1,
      name: infoCode?.code[i]?.name,
      date: infoCode?.date,
      number: infoCode?.code[i]?.number,
      operation: (
        <>
          <WrapperIconManagerGenerateCode>
            <ButtonDetail onClick={() => showModal(i)}>
              <MenuFoldOutlined />
            </ButtonDetail>
            <ButtonDelete title='Sure to delete?'>
              <DeleteOutlined style={{ paddingTop: '5px' }} />
            </ButtonDelete>
          </WrapperIconManagerGenerateCode>
        </>
      )
    })
  }
  if (infoCode?.code?.length % 10 !== 0) {
    for (let i = 0; i < 10 - (infoCode?.code?.length % 10); i++) {
      originData.push({
        key: originData.length,
        seri: originData.length + 1
      })
    }
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'seri',
      width: '10%'
    },
    {
      title: 'User Create',
      dataIndex: 'userCreate',
      width: '20%'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '20%'
    },
    {
      title: 'Number',
      dataIndex: 'number',
      width: '10%'
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      width: '15%'
    }
  ]
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title
      })
    }
  })
  return (
    <Form form={form} component={false}>
      <TableListOfCode
        components={{
          body: {}
        }}
        bordered
        dataSource={originData}
        columns={mergedColumns}
        rowClassName='editable-row'
        pagination={{
          showSizeChanger: false
        }}
      ></TableListOfCode>
      <ListOfCodeModal
        title='Detail'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <EditableTable keyIndex={keyIndex} handleCancel={handleCancel} />
      </ListOfCodeModal>
    </Form>
  )
}
const ListOfCode = () => {
  return (
    <WrapperListOfCode>
      <WrapperRenderListOfCode>
        <TableGenerateCode></TableGenerateCode>
      </WrapperRenderListOfCode>
    </WrapperListOfCode>
  )
}
export default ListOfCode
