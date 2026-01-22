import type { User } from '../../model/user';
interface UserProps  {
    user : User
}

function UserItem({ user  } : Readonly<UserProps>) {

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name} {user.surname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
        </tr>

    );
}

export default UserItem;