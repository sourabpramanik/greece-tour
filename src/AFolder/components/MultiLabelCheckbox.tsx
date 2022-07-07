import React from "react";


interface MultiLabelCheckboxProps{
	checkboxID: number
	label1: string
	label2: string
	isChecked: boolean
	handleOnChange?: ()=>void
}

const MultiLabelCheckbox = (props: MultiLabelCheckboxProps) => {
	const {checkboxID, label1, label2, isChecked, handleOnChange} = props;
	
	return(
		<div className="form-check form-check-inline flex items-start">
		  <input className="form-check-input appearance-none 
		  h-4 w-4 border border-gray-300 rounded bg-white 
		  checked:bg-blue-600 checked:border-primary-6000 
		  focus:outline-none transition duration-200 mt-1 align-top 
		  bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
		  type="checkbox" 
		  id={`inlineCheckbox${checkboxID}`}
		  checked={isChecked}
		  onChange={()=>handleOnChange(checkboxID)}
		   />
		  <div className="flex flex-col items-start px-2">
		 	<label class="form-check-label inline-block text-neutral-500 dark:text-neutral-400 cursor-pointer" for={`inlineCheckbox${checkboxID}`}>{label1}</label>
		   	<label class="form-check-label inline-block text-neutral-500 dark:text-neutral-400 cursor-pointer" for={`inlineCheckbox${checkboxID}`}>
		   		{
		   			isNaN(label2)? label2 : `€${label2}`
		   		}
		   		
		   	</label>
		  </div>
		</div>
	)
}

export default MultiLabelCheckbox;