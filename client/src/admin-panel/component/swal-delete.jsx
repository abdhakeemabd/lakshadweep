import Swal from 'sweetalert2'
import DeleteIcon from '../../assets/admin-panel-icon/icons/delete-micon.svg'
import SuccessIcon from '../../assets/admin-panel-icon/icons/success-icon.svg'
import ErrorIcon from '../../assets/admin-panel-icon/icons/error-icon.svg'

export const showDeleteAlert = async (itemName = 'this item') => {
  const result = await Swal.fire({
    title: 'Confirm Deletion',
    text: `Are you sure you want to delete this ${itemName} permanently?`,
    imageUrl: DeleteIcon,
    imageAlt: 'Delete warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'No, Cancel',
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      popup: '!rounded-[18px] !w-[390px]',
      title: '!text-[24px] !font-bold !text-[#262626]',
      htmlContainer: '!text-[16px] !leading-[24px] !text-[#393939] !font-normal !pl-[56px] !pr-[56px] !pb-[20px]',
      actions: 'gap-3',
      confirmButton: 'bg-[#0F2446] text-white h-[52px] min-w-[165px] text-[16px] px-6 py-2.5 rounded-[14px] font-semibold hover:bg-[#1a3a6b] transition-colors',
      cancelButton: 'bg-white text-[#575757] h-[52px] min-w-[165px] text-[16px] px-6 py-2.5 rounded-[14px] font-semibold border border-gray-300 hover:bg-gray-50 transition-colors'
    }
  });

  return result.isConfirmed;
};
export const showDeleteSuccess = (itemName = 'Item') => {
  Swal.fire({
    title: 'Deleted!',
    text: `${itemName} has been deleted successfully.`,
    imageUrl: SuccessIcon,
    imageAlt: 'Success',
    confirmButtonText: 'Yes',
    buttonsStyling: false,
    customClass: {
      popup: '!rounded-[18px] !w-[390px]',
      title: '!text-[24px] !font-bold !text-[#262626]',
      htmlContainer: '!text-[16px] !leading-[24px] !text-[#393939] !font-normal !pl-[56px] !pr-[56px] !pb-[20px]',
      actions: 'gap-3',
      confirmButton: 'bg-[#0F2446] text-white h-[52px] w-[342px] text-[16px] px-6 py-2.5 rounded-[14px] font-semibold hover:bg-[#1a3a6b] transition-colors',
    },
    showConfirmButton: true
  });
};
export const showDeleteError = () => {
  Swal.fire({
    title: 'Error',
    text: 'Something went wrong...',
    imageUrl: ErrorIcon,
    imageAlt: 'Error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#0F2446',
    customClass: {
      popup: '!rounded-[18px] !w-[390px]',
      title: '!text-[24px] !font-bold !text-[#262626]',
      htmlContainer: '!text-[16px] !leading-[24px] !text-[#393939] !font-normal !pl-[56px] !pr-[56px] !pb-[20px]',
      actions: 'gap-3',
      confirmButton: 'bg-[#0F2446] text-white h-[52px] min-w-[342px] text-[16px] px-6 py-2.5 !rounded-[14px] font-semibold',
    }
  });
};