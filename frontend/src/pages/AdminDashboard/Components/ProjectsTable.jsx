import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "@/ApiProvider";
import { AdminContext } from "@/Components/AdminProvider";
import { ConfirmDialog } from "@/Components/ConfirmDialog";
import { MessagePopup } from "@/Components/MessagePopup";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/Components/ui/pagination";

export const ProjectsTable = () => {
	const api = useApi(); // ✅ Use ApiProvider
	const { activeTab, setActiveTab, setProjectData, setIsEditing } =
		useContext(AdminContext);
	const [projects, setProjects] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const [totalPages, setTotalPages] = useState(1);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [popup, setPopup] = useState({ message: "", type: "" });
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleDeleteClick = (id) => {
		setDeleteId(id);
		setShowDeleteDialog(true);
	};

	useEffect(() => {
		fetchProjects(page, pageSize);
	}, [page]);

	useEffect(() => {
		fetchTotalPages();
	}, []);

	const fetchTotalPages = async () => {
		try {
			// ✅ Use api.get instead of fetch
			const [data, status, error] = await api.get("/list/waqf-projects/");

			if (!error && Array.isArray(data)) {
				setTotalPages(Math.ceil(data.length / pageSize));
				console.log("Total Pages:", data);
			} else {
				console.error("Error fetching total pages:", error);
				setTotalPages(1);
			}
		} catch (err) {
			console.error("Error fetching total pages:", err);
			setTotalPages(1);
		}
	};

	const fetchProjects = async (pageNumber, pageSize) => {
		try {
			setIsLoading(true);

			// ✅ Use api.get with params instead of fetch
			const [data, status, error] = await api.get(
				"/list/waqf-projects/",
				{
					page: pageNumber,
					page_size: pageSize,
				}
			);

			if (!error && status >= 200 && status < 300) {
				setProjects(Array.isArray(data) ? data : []);
			} else {
				console.error("Failed to fetch projects:", error || status);
				setProjects([]);
			}
		} catch (err) {
			console.error("Error fetching projects:", err);
			setProjects([]);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteProject = async () => {
		try {
			setIsLoading(true);

			const [data, status, error] = await api.delete(
				`/waqf-projects/${deleteId}/`
			);

			if (error || !(status >= 200 && status < 300)) {
				setPopup({
					message:
						error || data?.detail || "Failed to delete project",
					type: "error",
				});
			} else {
				setPopup({
					message: "Project deleted successfully",
					type: "success",
				});
				setProjects((prevProjects) =>
					prevProjects.filter((project) => project.id !== deleteId)
				);
			}
		} catch (err) {
			setPopup({
				message: "Error deleting project",
				type: "error",
			});
		} finally {
			setIsLoading(false);
			setShowDeleteDialog(false);
		}
	};

	const handleEdit = (project) => {
		setProjectData(project);
		setIsEditing(true);
		setActiveTab("ManageProject");
	};

	return (
		<>
			<div className='w-full mx-auto'>
				<table className='w-full border-collapse border border-gray-950'>
					<thead>
						<tr className='bg-gray-800 text-[0.8em] text-white'>
							<th className='border border-gray-300 p-2'>ID</th>
							<th className='border border-gray-300 p-2'>
								Project Name
							</th>
							<th className='border border-gray-300 p-2'>
								Partners
							</th>
							<th className='border border-gray-300 p-2'>
								Created Date
							</th>
							<th className='border border-gray-300 p-2'>
								Updated Date
							</th>
							<th className='border border-gray-300 p-2'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.length > 0 ? (
							projects.map((project) => (
								<tr
									key={project.id}
									className='text-center text-[0.7em] border border-gray-300 hover:bg-gray-100 transition duration-300'>
									<td className='p-2'>{project.id}</td>
									<td className='p-2'>{project.name}</td>
									<td className='p-2'>{project.partners}</td>
									<td className='p-2'>
										{project.created_at}
									</td>
									<td className='p-2'>
										{project.updated_at}
									</td>
									<td className='p-2 flex gap-2 justify-center'>
										<button
											onClick={() => handleEdit(project)}
											disabled={isLoading}
											className='px-3 py-1 bg-gray-800 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50'>
											Edit
										</button>
										<button
											onClick={() =>
												handleDeleteClick(project.id)
											}
											disabled={isLoading}
											className='px-3 py-1 bg-gray-800 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50'>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className='text-center p-4 text-gray-600'>
									No projects found
								</td>
							</tr>
						)}
					</tbody>
				</table>

				<div className='flex justify-center mt-5'>
					<Pagination>
						<PaginationContent>
							{/* Previous Button */}
							<PaginationItem>
								<PaginationPrevious
									className={"border-pagin border-1"}
									href='#'
									onClick={(e) => {
										e.preventDefault();
										if (page > 1) setPage(page - 1);
									}}
								/>
							</PaginationItem>

							{/* Render page numbers dynamically */}
							{Array.from(
								{ length: totalPages },
								(_, i) => i + 1
							).map((p) => (
								<PaginationItem key={p}>
									<PaginationLink
										className={
											p === page
												? "border-pagin text-pagin bg-gray-300"
												: "pagin-btn"
										}
										href='#'
										isActive={p === page}
										onClick={(e) => {
											e.preventDefault();
											setPage(p);
										}}>
										{p}
									</PaginationLink>
								</PaginationItem>
							))}

							{/* Next Button */}
							<PaginationItem>
								<PaginationNext
									className={"border-pagin border-1"}
									href='#'
									onClick={(e) => {
										e.preventDefault();
										if (page < totalPages)
											setPage(page + 1);
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</div>

			<ConfirmDialog
				isOpen={showDeleteDialog}
				onClose={() => setShowDeleteDialog(false)}
				onConfirm={deleteProject}
				title='Confirm Deletion'
				message='Are you sure you want to delete this project?'
				confirmText='delete'
				cancelText='cancel'
				dir='ltr'
			/>
			<MessagePopup
				message={popup.message}
				type={popup.type}
				onClose={() => setPopup({ message: "", type: "" })}
			/>
		</>
	);
};
