import React, {useState, useEffect, useCallback} from "react"
import { useHttp } from "../hooks/http.hook"
import { UserList } from "../components/UserList"

export default function Home() {
  const [users, setUsers] = useState([])
  const {request} = useHttp()

  const fetchUsers = useCallback( async () => {
    try {
      const fetched = await request('api/auth/home', 'GET', null)
      setUsers(fetched)
    } catch(e) {}
  }, [request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])
  
  return (
    <UserList users = {users}/>
  )
}