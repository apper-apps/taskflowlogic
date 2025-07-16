import React from "react";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = ({ 
  searchQuery, 
  onSearchChange, 
  onAddTask,
  onToggleSidebar,
  user,
  logout
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
          >
            <ApperIcon name="Menu" size={20} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="CheckSquare" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          </div>
        </div>
        
<div className="flex items-center gap-4">
          <div className="hidden sm:block flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search tasks..."
            />
          </div>
          
          <Button
            onClick={onAddTask}
            variant="primary"
            icon="Plus"
            className="hidden sm:inline-flex"
          >
            Add Task
          </Button>
          
          <Button
            onClick={onAddTask}
            variant="primary"
            className="sm:hidden"
          >
            <ApperIcon name="Plus" size={18} />
          </Button>
          
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-sm text-gray-600">
                {user.firstName} {user.lastName}
              </div>
              <Button
                onClick={logout}
                variant="outline"
                icon="LogOut"
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
              <Button
                onClick={logout}
                variant="outline"
                className="sm:hidden"
              >
                <ApperIcon name="LogOut" size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="sm:hidden mt-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search tasks..."
        />
      </div>
    </header>
  );
};

export default Header;