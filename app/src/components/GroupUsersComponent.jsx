import { useState } from "react";
import CustomModal from "./CustomModal";

const GroupUsersComponent = ({ groupUsers }) => {
    const [isModalOpen, setModalOpen] = useState(true);

    const closeModal = () => setModalOpen(false);
    console.log(groupUsers);
    return (
        <div className="p-4">
            <CustomModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Group Users"
            >
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left border">User ID</th>
                            <th className="p-3 text-left border">Name</th>
                            <th className="p-3 text-left border">Last Activated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupUsers.map((user) => (
                            <tr key={user.$id}>
                                <td className="p-3 border">{user.azDisplayName}</td>
                                <td className="p-3 border">{user.azUpn}</td>
                                <td className="p-3 border">{user.azLastActivated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CustomModal>
        </div>
    );
};

export default GroupUsersComponent;