import React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fileUploadByUserId } from '../../redux/documentSlice'

const FileUpload = (props) => {
    const { documentType } = props
    const { Dragger } = Upload
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state.user.check?.data?.user?._id)

    const customUploadRequest = (options, fileToUpload, currentUserId) => {
        const { file, onSuccess, onError } = options
        const reader = new FileReader()
        let renamedFile

        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            switch (fileToUpload) {
                case 'notebook':
                    renamedFile = new File(
                        [reader.result],
                        `notebook_${currentUserId}.pdf`,
                        { type: file.type }
                    )
                break
                case 'chart':
                    renamedFile = new File(
                        [reader.result],
                        `chart_${currentUserId}.pdf`,
                        { type: file.type }
                    )
                break
                case 'report':
                    renamedFile = new File(
                        [reader.result],
                        `report_${currentUserId}.pdf`,
                        { type: file.type }
                    )
                break
                default:
                break
            }

            const formData = new FormData()
            formData.append('file', renamedFile)

            dispatch(fileUploadByUserId(formData))
            .then((response) => {
                response.payload.status === 'success'
                    ? toast.success(response.payload.message)
                    : toast.error(response.payload.message)
                onSuccess(response.payload.data, renamedFile)
            })
            .catch((error) => {
                toast.error(error)
                onError(error)
            })
        }
    }

    return (
        <Dragger
            listType="picture"
            showUploadList={false}
            customRequest={(options) => customUploadRequest(options, documentType, currentUserId)}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Dosya yüklemek için bu alana tıklayın veya sürükleyin
            </p>
            <p className="ant-upload-hint">
                Yükleyeceğiniz dosya pdf dosyası olmak zorundadır. <br />
                Yanlış dosya yüklemelerinden öğrenci sorumludur.
            </p>
        </Dragger>
    )
}

export default FileUpload
