'use client'
import { useForm } from 'react-hook-form'
import BasicButton from '@/components/Buttons/BasicButton'
import Reveal from '@/components/Effects/reveal'
import { ExperienceType } from '@/types/Experience'
import { useColor } from '@/contexts/ColorContext'
import clsx from 'clsx'
import { useState } from 'react'
import { sendExperienceBooking } from '@/app/actions/emails'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FaCalendarAlt, FaUserFriends, FaGlassCheers, FaClock, FaEnvelope, FaPhone, FaUser, FaCommentAlt } from 'react-icons/fa'

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  participants?: number
  eventType?: string
  tourTime?: string
  comments: string
}

type BookingFormProps = {
  experienceType: ExperienceType
  experienceTitle: string
  formFields?: string[]
  timeSlots?: {
    value: string
    label: string
  }[]
}

export default function BookingForm({ 
  experienceType, 
  experienceTitle,
  formFields = [],
  timeSlots = []
}: BookingFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
  const { isRed } = useColor()
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
    showScreen: boolean;
  }>({ showScreen: false });
  const router = useRouter();

  const onSubmit = async (data: FormData) => {

    
    try {
     
      
      const result = await sendExperienceBooking(
        data.name,
        data.email,
        data.phone,
        data.date,
        experienceTitle,
        data.participants,
        data.eventType,
        data.tourTime,
        data.comments
      );
      

      
      if (result.error) {
        console.error('Error from server action:', result.error);
        setSubmitStatus({
          success: false,
          message: `Error: ${result.error}`,
          showScreen: true
        });
      } else {
        setSubmitStatus({
          success: true,
          message: "¡Solicitud enviada correctamente! Te contactaremos pronto.",
          showScreen: true
        });
        reset(); // Clear the form
      }
    } catch (e) {
      console.error('Exception during form submission:', e);
      setSubmitStatus({
        success: false,
        message: e instanceof Error 
          ? `Error: ${e.message}` 
          : "Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.",
        showScreen: true
      });
    }
  }

  if (submitStatus.showScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 px-6 rounded-2xl shadow-lg border"
        style={{
          borderColor: submitStatus.success ? 'rgba(141, 19, 30, 0.2)' : 'rgba(220, 38, 38, 0.2)',
          backgroundColor: submitStatus.success ? 'rgba(141, 19, 30, 0.05)' : 'rgba(220, 38, 38, 0.05)'
        }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: submitStatus.success ? 'rgba(141, 19, 30, 0.1)' : 'rgba(220, 38, 38, 0.1)'
            }}
          >
            {submitStatus.success ? (
              <svg className="w-14 h-14 text-crred" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-medium" style={{ color: submitStatus.success ? '#8D131E' : '#DC2626' }}>
            {submitStatus.success ? '¡Reserva Recibida!' : 'Error al Enviar'}
          </h3>
          
          <p className="text-lg text-gray-700 max-w-md">
            {submitStatus.message}
            {submitStatus.success && (
              <span className="block mt-2 text-base italic">
                Revisa tu correo electrónico para más detalles sobre tu experiencia.
              </span>
            )}
          </p>
          
          <div className="pt-6">
            <BasicButton 
              type="button" 
              variant="transparent"
              className={`border text-lg px-8 py-3 ${submitStatus.success ? 'border-crred text-crred hover:bg-crred/10' : 'border-red-600 text-red-600 hover:bg-red-600/10'}`}
              onClick={() => setSubmitStatus({ showScreen: false })}
            >
              {submitStatus.success ? 'Enviar Otra Reserva' : 'Intentar Nuevamente'}
            </BasicButton>
            
            {!submitStatus.success && (
              <div className="mt-4">
                <button 
                  type="button"
                  className="text-gray-600 hover:text-gray-800 text-sm underline"
                  onClick={() => router.push('/contact')}
                >
                  Contactar a Soporte
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const inputClasses = clsx(
    'w-full p-2 pl-9 border-b focus:outline-none placeholder-gray-400',
    {
      'border-back text-back placeholder:text-back/75 bg-transparent': isRed,
      'border-crred text-gray-700 placeholder:text-gray-400 bg-transparent': !isRed,
    }
  )

  const labelClasses = clsx('block text-sm font-medium mb-1', {
    'text-back': isRed,
    'text-crred': !isRed
  });

  const iconClasses = clsx('absolute left-0 top-2.5 text-lg', {
    'text-back/70': isRed,
    'text-crred/70': !isRed
  });

  // Use timeSlots from props if available, otherwise fall back to default options
  const renderTimeSlotOptions = () => {
    if (timeSlots && timeSlots.length > 0) {
      return (
        <>
          <option value="">Seleccione horario...</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <>
          <option value="">Seleccione horario...</option>
          <option value="10:00">10:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="15:00">3:00 PM</option>
        </>
      );
    }
  };

  const getDynamicFields = () => {
    return formFields.map(field => {
      switch(field) {
        case 'participants':
          return (
            <div className="space-y-1" key="participants">
              <label className={labelClasses}>Número de participantes</label>
              <div className="relative">
                <FaUserFriends className={iconClasses} />
                <input
                  type="number"
                  {...register('participants', { required: true })}
                  className={inputClasses}
                  placeholder="Ingrese número de personas"
                />
                {errors.participants && (
                  <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                )}
              </div>
            </div>
          )
        case 'eventType':
          return (
            <div className="space-y-1" key="eventType">
              <label className={labelClasses}>Tipo de evento</label>
              <div className="relative">
                <FaGlassCheers className={iconClasses} />
                <select
                  {...register('eventType', { required: true })}
                  className={clsx(inputClasses, 'appearance-none bg-transparent')}
                >
                  <option value="">Seleccione tipo...</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="aniversario">Aniversario</option>
                </select>
                {errors.eventType && (
                  <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                )}
              </div>
            </div>
          )
        case 'tourTime':
          return (
            <div className="space-y-1" key="tourTime">
              <label className={labelClasses}>Horario preferido</label>
              <div className="relative">
                <FaClock className={iconClasses} />
                <select
                  {...register('tourTime', { required: true })}
                  className={clsx(inputClasses, 'appearance-none bg-transparent')}
                >
                  {renderTimeSlotOptions()}
                </select>
                {errors.tourTime && (
                  <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                )}
              </div>
            </div>
          )
        default:
          return null
      }
    }) || []
  }
  
  const dynamicFieldsArray = getDynamicFields();

  return (
    <Reveal initial={true}>
      <div className={`p-5 rounded-xl bg-white shadow-sm border ${isRed ? 'border-back/10' : 'border-crred/10'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className={labelClasses}>Nombre completo</label>
              <div className="relative">
                <FaUser className={iconClasses} />
                <input
                  {...register('name', { required: true })}
                  className={inputClasses}
                  placeholder="Ingrese su nombre completo"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClasses}>Correo electrónico</label>
              <div className="relative">
                <FaEnvelope className={iconClasses} />
                <input
                  type="email"
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  className={inputClasses}
                  placeholder="Ingrese su correo electrónico"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 block">Proporcione un correo electrónico válido</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={labelClasses}>Teléfono</label>
                <div className="relative">
                  <FaPhone className={iconClasses} />
                  <input
                    type="tel"
                    {...register('phone', { required: true })}
                    className={inputClasses}
                    placeholder="Ingrese su número telefónico"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>Fecha preferida</label>
                <div className="relative">
                  <FaCalendarAlt className={iconClasses} />
                  <input
                    type="date"
                    {...register('date', { required: true })}
                    className={inputClasses}
                  />
                  {errors.date && (
                    <span className="text-red-500 text-xs mt-1 block">Este campo es requerido</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Fields Section - Show only if there are dynamic fields */}
          {dynamicFieldsArray.length > 0 && (
            <div className="space-y-4 pt-1 border-t border-gray-100">
              {dynamicFieldsArray.map((field, index) => (
                <div key={index}>{field}</div>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="space-y-1 pt-1 border-t border-gray-100">
            <label className={labelClasses}>Comentarios adicionales</label>
            <div className="relative">
              <FaCommentAlt className={`${iconClasses} top-3`} />
              <textarea
                {...register('comments')}
                className={clsx(inputClasses, 'h-20 resize-none pt-2')}
                placeholder="Ingrese cualquier comentario adicional"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <BasicButton 
              type="submit" 
              sizex="xxlarge"
              variant={isRed ? 'transparent-foot' : 'transparent'}
              className={clsx('w-full border text-base py-2.5', {
                'border-crred': isRed,
                'border-crred ': !isRed
              })}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar reserva'}
            </BasicButton>
          </div>
        </form>
      </div>
    </Reveal>
  )
}