import React from 'react'

export function UserList({users}) {
  return (
  <div className="d-flex justify-content-center align-items-center bg-primary h-100">
  <div className="w-80 bg-white rounded p-3">
  <div className='d-flex justify-content-center align-items-center m-2'>
    <button className="me-2 rounded bg-white">Delete</button>
    <button className="me-2 rounded bg-white">Block</button>
    <button className="me-2 rounded bg-white">Unblock</button>
  </div>
    <table className="table">
      <thead>
        <tr>
          <th>
            <form>
              <input type="checkbox"></input>
            </form>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
          <tr>
              <td>
              <form>
                <input type="checkbox"></input>
              </form>
              </td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
            </tr>
        )})}
      </tbody>
    </table>
  </div>
</div>
)
}