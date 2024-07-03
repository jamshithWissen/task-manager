import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TasksGrid = ({ tasks, handleComplete, handleDelete, handleEdit }) => {
  const [gridApi, setGridApi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Select",
        field: "completed",
        cellRenderer: (params) => (
          <input
            type="checkbox"
            checked={params.value}
            onChange={(e) => handleComplete(e, params.data.id)}
          />
        ),
        width: 100,
        headerClass: "header-center",
        cellClass: "cell-center",
      },
      {
        headerName: "Task",
        field: "name",
        width: 168,
        headerClass: "header-center",
        cellClass: "cell-center",
      },
      {
        headerName: "Priority",
        field: "priority",
        width: 150,
        headerClass: "header-center",
        cellClass: "cell-center",
        comparator: (valueA, valueB) => {
          const priorityMap = { low: 1, medium: 2, high: 3 };
          return priorityMap[valueA] - priorityMap[valueB];
        },
        sort: "asc",
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              className="taskButton"
              onClick={() => openModal(params.data.id)}
            >
              Delete
            </button>
            <button
              className="taskButton"
              onClick={(e) => handleEdit(e, params.data.id)}
            >
              Edit
            </button>
          </div>
        ),
        width: 180,
        headerClass: "header-center",
        cellClass: "cell-center",
      },
    ],
    [handleComplete, handleEdit]
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const confirmDelete = () => {
    handleDelete(null, selectedTaskId);
    closeModal();
    setShowOverlay(true);
    setOverlayMessage("Task deleted successfully");
    setTimeout(() => {
      setShowOverlay(false);
      if (gridApi) {
        gridApi.refreshCells();
      }
    }, 1000);
  };

  // Filter out invalid tasks
  const validTasks = tasks.filter(
    (task) => task && task.id && task.name && task.priority !== undefined
  );

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#E8F4FF" };
    }
    return { background: "#ffffff" };
  };

  return (
    <div className="ag-theme-quartz taskGrid">
      <h2>My Tasks</h2>
      <AgGridReact
        rowData={validTasks}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        sortable={true}
        defaultColDef={{
          headerClass: "header-center",
          cellClass: "cell-center",
        }}
        getRowStyle={getRowStyle}
      />
      {showOverlay && (
        <div className="overlay">
          <div className="loader"></div>
          <p>{overlayMessage}</p>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="modal-title">Confirm Delete</h2>
        <p className="modal-message">
          Are you sure you want to delete this task?
        </p>
        <div className="modal-buttons">
          <button
            className="modal-button modal-button-left"
            onClick={confirmDelete}
          >
            Yes
          </button>
          <button
            className="modal-button modal-button-right"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TasksGrid;
