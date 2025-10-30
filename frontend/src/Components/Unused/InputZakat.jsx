import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/Components/ui/tooltip';
import { useState } from 'react';
import { zakatForm } from '../tools/table';
export const InputZakat = ({ field }) => {
  const [formData, setFormData] = useState(zakatForm);
  const updateFieldValue = (fields, targetName, newValue) => {
    return fields.map((field) => {
      if (field.name === targetName) {
        return { ...field, value: newValue };
      }
      if (field.children && field.children.length > 0) {
        return {
          ...field,
          children: updateFieldValue(field.children, targetName, newValue),
        };
      }
      return field;
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/,/g, '');
    if (!isNaN(rawValue) && rawValue >= 0) {
      setFormData((prev) => updateFieldValue(prev, name, rawValue));
    }
  };
  const formatNumber = (num) =>
    !num ? '' : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div className='cal-input-bg'>
      <div className='flex items-center justify-between mb-3'>
        <label className='font-semibold text-gray-700 text-sm flex-1'>
          {field.label}
        </label>
        <Tooltip className='max-w-xs whitespace-normal text-sm leading-relaxed'>
          <TooltipTrigger asChild>
            <button className='p-1 hover:bg-gray-100 rounded-full transition-colors'>
              <img
                src='./211757_help_icon.svg'
                alt='help'
                className='w-5 h-5 opacity-60 hover:opacity-100 transition-opacity'
              />
            </button>
          </TooltipTrigger>
          <TooltipContent className='bg-emerald-600 text-white border-emerald-700 max-w-sm'>
            <p className='text-sm leading-relaxed'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              mollitia perspiciatis, quas esse placeat accusantium ipsa sed,
              voluptas aut, quae modi! Molestiae, voluptatem inventore! Velit
              vitae rerum dolorem voluptatum culpa. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Harum doloremque repellat eaque
              deleniti distinctio rem nihil perspiciatis! Consectetur neque
              deleniti iste in eveniet. Dolores ab eligendi magni atque facere
              dolor.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className='relative'>
        <input
          className='cal-input'
          type='text'
          name={field.name}
          value={formatNumber(field.valeur || '')}
          onChange={handleChange}
          placeholder='أدخل المبلغ'
        />
        {/* <ion-icon name='cash-outline' className='DA'></ion-icon> */}
        <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
          <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
        </div>
      </div>
    </div>
  );
};
