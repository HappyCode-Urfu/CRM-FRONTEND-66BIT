import s from './InfoCompany.module.scss'
import { NavButton } from 'components/UI/NavButton/NavButton.tsx'
import { CATEGORY_COMPANY, COMPANIES_ROUTE } from 'utils/constsRoutes.ts'
import { useTypedDispatch, useTypedSelector } from 'hooks/redux.ts'
import { useEffect } from 'react'
import { getDepartment } from 'store/reducers/Departaments/DepartmentActionCreators.ts'
import { Loading } from 'components/loading/Loading.tsx'
import { departmentSlice } from 'store/reducers/Departaments/DepartmentSlice.ts'
import { categorySlice } from 'store/reducers/Category/CategorySlice.ts'

export const InfoCompany = () => {
  const dispatch = useTypedDispatch()
  const { selectId } = departmentSlice.actions
  const { selectDepartmentId } = categorySlice.actions
  const { data, isLoading, error } = useTypedSelector((state) => state.departmentReducer)

  useEffect(() => {
    dispatch(getDepartment())
  }, [dispatch])

  return (
    <>
      {isLoading && <Loading />}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && (
        <>
          <div className={s.container}>
            <div className={s.title}>Ваши филиалы</div>
            <div className={s.block}>
              <div className={s.infoCompany}>
                <p>Cписок филиалов:</p>
              </div>
              <div className={s.companyList}>
                {data.map((res) => (
                  <div key={res.id}>
                    <p>{res.name}</p>
                    <NavButton
                      onClick={() => {
                        dispatch(selectId(res.id))
                        dispatch(selectDepartmentId(res.id))
                      }}
                      route={CATEGORY_COMPANY + '/' + res.id}
                      children={'Посмотреть'}
                    />
                  </div>
                ))}
              </div>
              <div className={s.route}>
                <NavButton route={COMPANIES_ROUTE} children={'Создать филиал'} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
