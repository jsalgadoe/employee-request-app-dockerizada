import { AccountEntity } from "../../../core/entities/account.entities"

interface Props {
    account:AccountEntity
}

export const AccountItem = ({ account }:Props) => {


  return (
    <div>{account.account_email}</div>
  )
}
