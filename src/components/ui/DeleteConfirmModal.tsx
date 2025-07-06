"use client"
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  isLoading?: boolean
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-foreground border border-gray/50 rounded-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <FaExclamationTriangle className="text-white" />
            </div>
            <h3 className="text-white text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-text hover:text-white disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        <p className="text-gray-text mb-6">{message}</p>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray/50 text-gray-text rounded-lg font-medium hover:bg-gray/20 hover:text-white  disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium  disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrash className="text-sm" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
