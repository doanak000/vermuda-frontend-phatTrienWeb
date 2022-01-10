import React, { useState } from 'react'
import { Form, Select, Space } from 'antd'
import {
  ButtonCreateTag,
  ButtonGenerateCode,
  FormItemGenerateCode,
  InputNameCode,
  InputNumberCode,
  ScrollList,
  TextAreaGenerateCode,
  WrapperGenerateCode
} from './generateCodeQR.style'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { SelectCustom } from '../../components/InputCustom/SelectCustom'
import { DatePickerCustom } from '../../components/InputCustom/DatePickerCustom'
import { InputNumberCustom } from '../../components/InputCustom/InputNumberCustom'
import { NOTIFICATION_TYPE, PATH } from '../../constants/common'
import { Notification } from '../../components/Notification/Notification'
import { LableCustom } from '../../components/InputCustom/LableCustom'
import { useDispatch } from 'react-redux'
import { createInfoCode, createListOfCode } from './generateCodeSliceQR'
import { useHistory, withRouter } from 'react-router-dom'
import createId from 'create-id'
import format from 'date-format'

const { Option } = Select
const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
}
const dateFormat = 'YYYY-MM-DD'
const GenerateCodeQR = () => {
  const formRef = React.createRef()
  const dispatch = useDispatch()
  const onReset = () => {
    formRef.current.resetFields()
    setSumNumber(0)
  }
  const history = useHistory()
  const onFinish = (values) => {
    if (total > 0) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: `Input more number (${total}/${sumNumber})`
      })
    } else if (
      (values.code?.reduce(
        (total, currentValue) => (total = total + (currentValue?.number || 0)),
        0
      ) || 0) > values.total
    ) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: 'Input so much. Decrease number'
      })
    } else {
      dispatch(
        createInfoCode({
          infoCode: {
            store: `${values.store}`,
            total: values.total,
            date: format('yyyy-MM-dd', new Date(values.date)),
            description: `${values.description}`,
            code: values.code
          }
        })
      )
      const originData = []
      let countKey = 0
      for (let i = 0; i < values?.code.length; i++) {
        const childOriginData = []
        let countSeri = 0
        const limit = values?.code[i]?.number

        for (let j = 0; j < limit; j++) {
          console.log(limit)
          console.log(values?.code[i]?.number)
          if (countSeri < values?.code[i]?.number) {
            childOriginData.push({
              key: countKey,
              seri: countSeri + 1,
              randomCode: createId(null, null, 9, '0123456789'),
              name: values?.code[i]?.name,
              date: format('yyyy-MM-dd', new Date(values.date)),
              status: 'Valid'
            })
            countSeri += 1
            countKey += 1
          }
        }
        originData.push(childOriginData)
      }

      dispatch(createListOfCode(originData))
      history.push(PATH.LISTOFCODE)
    }
  }
  const [sumNumber, setSumNumber] = useState()
  const [total, setTotal] = useState()

  const onValuesChange = (changedValues, allValues) => {
    setSumNumber(allValues.total)
    setTotal(
      allValues.total -
        (allValues.code?.reduce(
          (total, currentValue) =>
            (total = total + (currentValue?.number || 0)),
          0
        ) || 0)
    )
  }

  return (
    <WrapperGenerateCode>
      <Form
        {...layout}
        ref={formRef}
        name='control-ref'
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <FormItemGenerateCode
          name='store'
          label={<LableCustom>Store</LableCustom>}
          rules={[
            {
              required: true
            }
          ]}
        >
          <SelectCustom placeholder='Select store' allowClear>
            <Option value='store1'>store 1</Option>
            <Option value='store2'>store 2</Option>
          </SelectCustom>
        </FormItemGenerateCode>

        <FormItemGenerateCode
          name='total'
          label={<LableCustom>Total</LableCustom>}
          rules={[
            {
              required: true
            }
          ]}
        >
          <InputNumberCustom
            placeholder='Input number (max=99999)'
            min={1}
            maxLength={5}
            max={99999}
          />
        </FormItemGenerateCode>

        {sumNumber > 0 ? (
          <Form.List name='code'>
            {(fields, { add, remove }) => (
              <>
                <Form.Item>
                  <ButtonCreateTag
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Field ({(total || 0) <= 0 ? 0 : total} /{' '}
                    {sumNumber || 0})
                  </ButtonCreateTag>
                </Form.Item>
                <ScrollList>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'center'
                      }}
                      align='baseline'
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'name']}
                        fieldKey={[field.fieldKey, 'name']}
                        rules={[{ required: true, message: 'Missing  name' }]}
                      >
                        <InputNameCode placeholder=' Name' maxLength={20} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'number']}
                        fieldKey={[field.fieldKey, 'number']}
                        rules={[{ required: true, message: 'Missing  number' }]}
                      >
                        <InputNumberCode
                          placeholder=' Number'
                          min={0}
                          maxLength={5}
                          max={99999}
                        />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                </ScrollList>
              </>
            )}
          </Form.List>
        ) : null}

        <Form.Item
          name='date'
          label={<LableCustom>Date</LableCustom>}
          rules={[
            {
              required: true
            }
          ]}
        >
          <DatePickerCustom format={dateFormat} />
        </Form.Item>

        <Form.Item
          name='description'
          label={<LableCustom>Description</LableCustom>}
          rules={[
            {
              required: true
            }
          ]}
        >
          <TextAreaGenerateCode rows={4}></TextAreaGenerateCode>
        </Form.Item>

        <Form.Item>
          <ButtonGenerateCode
            type='primary'
            htmlType='submit'
            to='/hello'
            style={{ borderRadius: '8px 0px 0px 8px' }}
          >
            Submit
          </ButtonGenerateCode>

          <ButtonGenerateCode
            htmlType='button'
            onClick={onReset}
            style={{ borderRadius: '0px 8px 8px 0px' }}
          >
            Reset
          </ButtonGenerateCode>
        </Form.Item>
      </Form>
    </WrapperGenerateCode>
  )
}

export default withRouter(GenerateCodeQR)
