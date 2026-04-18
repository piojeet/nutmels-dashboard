import React, { useRef, useState } from 'react';
import Sample from '../../assets/sample.avif';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BiPlus } from 'react-icons/bi';
import { showAppToast } from '../../utils/appToast';

function SeoHome() {
  const [slides, setSlides] = useState([
    { src: Sample, alt: 'Sample Image 1' },
    { src: Sample, alt: 'Sample Image 2' },
    { src: Sample, alt: 'Sample Image 3' },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);
  const notify = (detail, severity = 'info') => {
    showAppToast({
      severity,
      summary: 'UI/SEO',
      detail,
    });
  };

  const handleDelete = (index) => {
    const updated = [...slides];
    updated.splice(index, 1);
    setSlides(updated);
    notify(`Slide ${index + 1} deleted.`, 'success');
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleAddNew = () => {
    setEditingIndex(null);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    if (editingIndex !== null) {
      const updated = [...slides];
      updated[editingIndex] = { src: imageUrl, alt: 'Updated Image' };
      setSlides(updated);
      setEditingIndex(null);
      notify('Slide image updated.', 'success');
      return;
    }

    setSlides([...slides, { src: imageUrl, alt: 'New Image' }]);
    notify('New slide added.', 'success');
  };

  return (
    <div>
      <input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} className='hidden' />

      <Swiper className='w-full' slidesPerView={1} spaceBetween={20} pagination={{ clickable: true }} modules={[Pagination]}>
        {slides.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className='relative h-56 w-full overflow-hidden rounded-xl sm:h-72'>
              <img src={item.src} alt={item.alt} className='h-full w-full object-cover opacity-50' />

              <div className='absolute inset-x-4 bottom-4 flex flex-wrap justify-end gap-2'>
                <button onClick={() => handleDelete(idx)} className='rounded-md bg-white px-3 py-2 text-sm text-[#920002]'>
                  Delete
                </button>
                <button onClick={() => handleEdit(idx)} className='rounded-md bg-white px-3 py-2 text-sm'>
                  Edit
                </button>
                <button onClick={handleAddNew} className='flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm'>
                  <BiPlus /> Add New
                </button>
              </div>

              {editingIndex === idx && (
                <button
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className='absolute left-1/2 top-1/2 max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-yellow-color px-3 py-2 text-center text-xs font-medium sm:text-sm'
                >
                  Upload New Images in 1024 * 52
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
        .swiper-pagination {
          position: static;
        }

        .swiper-pagination-bullet {
          background: #D9D9D94D;
          opacity: 1;
          width: 10px;
          height: 10px;
        }

        .swiper-pagination-bullet-active {
          background: #FAAA21;
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
}

export default SeoHome;

