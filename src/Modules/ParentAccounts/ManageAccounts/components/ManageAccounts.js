import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getStudentsAll } from "../../../StudentInfo/StudentInformation/service";
import { getUsers } from "../service";
import ConnectedStudentsModal from "../../Modals/ConnectedStudentsModal";
import DataTable from "react-data-table-component";
import createColumns from "../helpers/dataTable";
import PasswordResetModal from "../../Modals/PasswordResetModal";
import { deleteUser } from "../service";

const ManageAccounts = () => {
  const dispatch = useDispatch();
  const { data: parents, loading: status } = useSelector(
    (state) => state.getUser
  );
  const { data: students } = useSelector((state) => state.getAllStudents);
  const { register, watch } = useForm(); // Initialize useForm
  const searchTerm = watch("searchTerm", ""); // Watch for search term changes

  const [selectedParent, setSelectedParent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [parentsWithState, setParentsWithState] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getStudentsAll());
  }, [dispatch]);

  useEffect(() => {
    // Initialize dropdown state for each parent
    const parentsWithDropdown = (parents || []).map((parent) => ({
      ...parent,
      isDropdownOpen: false,
    }));
    setParentsWithState(parentsWithDropdown);
  }, [parents]);

  const handleShowStudents = (email) => {
    const relatedStudents = students.filter(
      (student) => student.fatherEmail === email
    );
    setSelectedParent(relatedStudents);
    setShowModal(true);
  };
  const handleResetPassword = (row) => {
    setResetModal(true);
    setSelectedRow(row);
  };

  const handleAction = async (actionType, row) => {
    if (actionType === "toggleDropdown") {
      setParentsWithState((prev) =>
        prev.map(
          (parent) =>
            parent.id === row.id
              ? { ...parent, isDropdownOpen: !parent.isDropdownOpen }
              : { ...parent, isDropdownOpen: false } // Close other dropdowns
        )
      );
    } else if (actionType === "edit") {
      console.log("Edit parent:", row);
    } else if (actionType === "delete") {
      try {
        const id = row.id;
        await dispatch(deleteUser(id));
        // Close all dropdowns after deletion
        setParentsWithState((prev) =>
          prev.map((parent) => ({ ...parent, isDropdownOpen: false }))
        );
        const updatedStudents = await dispatch(getStudentsAll()).unwrap(); // Fetch latest data and ensure UI updates
        setParentsWithState(updatedStudents);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    } else if (actionType === "deactivate") {
      console.log("Deactivate parent:", row);
    }
  };

  const columns = createColumns({
    handleShowStudents,
    handleAction,
    handleResetPassword,
  });

  // Filter parents based on the search term
  const filteredParents = parentsWithState.filter((parent) =>
    `${parent.name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Manage Parent Accounts</h1>

      {/* Search Input with useForm */}
      <div className="mb-4">
        <form>
          <input
            {...register("searchTerm")} // Register input field with useForm
            type="text"
            className="border rounded w-full p-2"
            placeholder="Search by name or phone number"
          />
        </form>
      </div>

      {status === "loading" ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredParents || []} // Pass filtered data
          pagination
          highlightOnHover
          responsive
          className="text-xs"
        />
      )}

      {showModal && (
        <ConnectedStudentsModal
          students={selectedParent}
          onClose={() => setShowModal(false)}
        />
      )}

      {resetModal && (
        <PasswordResetModal
          onClose={() => setResetModal(false)}
          row={selectedRow}
        />
      )}
    </div>
  );
};

export default ManageAccounts;
