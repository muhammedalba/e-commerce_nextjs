import React from "react";
import InputError from "../common/InputError";

import { motion } from "framer-motion";
import { FormInputProps } from "@/types/ui/FormInputProps.types";
import { Skeleton } from "@mui/material";

export default function FormInput({
  id,
  isLoading,
  label,
  iconClass,
  type = "text",
  error,
  register,
  disabled = false,
}: FormInputProps) {
  return (
    <motion.div
      className="input-wrapper mb-3"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
    >
      <div className="d-flex gap-3 align-items-center mb-4">
        <i className={`text-primary ${iconClass} `} />
        <label className="m-0" htmlFor={id}>
          {label}
        </label>
      </div>

      {isLoading ? (
        <Skeleton variant="rounded" sx={{ width: "100%" }} height={40} />
      ) : (
        <input
          id={id}
          type={type}
          {...register}
          placeholder={label}
          className={`form-control ${error ? "is-invalid " : ""}`}
          aria-describedby={`${id}-error`}
          disabled={disabled}
        />
      )}
      <InputError id={`${id}-error`} message={error} />
    </motion.div>
  );
}
// import React from "react";
// import { motion } from "framer-motion";
// import { FormInputProps } from "@/types/ui/FormInputProps.types";
// import TextField from "@mui/material/TextField";

// export default function FormInput({
//   id,
//   label,
//   iconClass,
//   type = "text",
//   error,
//   register,
//   disabled = false,
// }: FormInputProps) {
//   return (
//     <motion.div
//       className="input-wrapper mb-3"
//       initial={{ opacity: 0, y: 3 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.2 }}
//       exit={{ opacity: 0 }}
//     >
//       <TextField
//         className="my-4"
//         id={id}
//         placeholder={label}
//         type={type}
//         label={
//           <div className="d-flex gap-3 align-items-center mb-4">
//             <i
//               className={`${
//                 error ? "text-danger" : "text-primary"
//               } text-primary ${iconClass}`}
//             />

//             {label}
//           </div>
//         }
//         variant="outlined"
//         fullWidth
//         error={!!error}
//         helperText={error}
//         disabled={disabled}
//         sx={{
//           "& legend": {
//             display: "none",
//           },
//           "& .MuiOutlinedInput-root": {
//             "& fieldset": {
//               border: "none", // حذف البوردر
//             },

//           },
//         }}
//         slotProps={{
//           inputLabel: {
//             sx: {
//               fontSize: "1.7rem",
//               insetInline: "auto",
//               margin: "0  30px",
//               padding: " 0 10px",
//               "&.Mui-focused": {
//                 fontSize: "2.4rem",
//                 background: error ? "" : "#fff",

//                 top: "-8px",
//               },
//             },
//           },
//           formHelperText: {
//             sx: {
//               fontSize: "1.6rem",
//             },
//           },
//         }}
//         {...register}
//       />
//     </motion.div>
//   );
// }
