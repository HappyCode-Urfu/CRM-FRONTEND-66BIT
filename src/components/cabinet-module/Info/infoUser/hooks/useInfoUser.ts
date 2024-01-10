import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import {
  getInfoUser,
  sendAvatar,
  updateUserInfo,
} from 'store/reducers/Account/AccountActionCreator.ts'
import { toast } from 'react-toastify'
import { useInput } from 'hooks/useInput.ts'

export const useInfoUser = () => {
  const dispatch = useTypedDispatch()
  const { data, error, isLoading, avatarUrl } = useTypedSelector(
    (state) => state.accountReducer
  )
  const [img, setImg] = useState<File | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [modalActive, setModalActive] = useState<boolean>(false)
  const fileRef = useRef<HTMLDivElement | null>(null)

  const { values, handleChange } = useInput({
    name: '',
    email: '',
    city: '',
  })

  useEffect(() => {
    dispatch(getInfoUser())
  }, [dispatch])

  const toggleBlock = () => {
    if (fileRef.current) {
      fileRef.current.style.display = show ? 'none' : 'block'
      setShow(!show)
    }
  }

  const handleUpload = async () => {
    if (img) {
      const formData = new FormData()
      formData.append('userId', data.id)
      formData.append('image', img)
      dispatch(sendAvatar(formData))
    } else {
      toast('Выберите изображение перед тем как его сохранить')
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0])
      toast('Сохраните изображение')
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUserInfo({ id: data.id, values }))
    setModalActive(false)
  }

  return {
    data,
    fileRef,
    error,
    isLoading,
    avatarUrl,
    img,
    show,
    modalActive,
    values,
    handleChange,
    toggleBlock,
    handleUpload,
    handleImageChange,
    handleSubmit,
    setModalActive,
  }
}
