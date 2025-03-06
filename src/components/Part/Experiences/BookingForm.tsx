'use client'
import { useForm } from 'react-hook-form'
import BasicButton from '@/components/Buttons/BasicButton'
import Reveal from '@/components/Effects/reveal'
import { ExperienceType } from '@/types/Experience'
import { useColor } from '@/contexts/ColorContext'
import clsx from 'clsx'

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
  formFields?: string[]
}

export default function BookingForm({ 
  experienceType, 
  formFields = [] 
}: BookingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { isRed } = useColor()

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2))
  }

  const inputClasses = clsx(
    'w-full p-2 border-b focus:outline-none placeholder-gray-400',
    {
      'border-back text-back placeholder:text-back/75 bg-transparent': isRed,
      'border-crred text-gray-700 placeholder:text-gray-400 bg-transparent': !isRed,
    }
  )

  const getDynamicFields = () => {
    return formFields.map(field => {
      switch(field) {
        case 'participants':
          return (
            <Reveal key="participants">
              <div className="space-y-4">
                <label className={clsx('block text-lg', {
                  'text-back': isRed,
                  'text-crred': !isRed
                })}>Número de participantes</label>
                <input
                  type="number"
                  {...register('participants', { required: true })}
                  className={inputClasses}
                  placeholder="Ingrese número de personas"
                />
              </div>
            </Reveal>
          )
        case 'eventType':
          return (
            <Reveal key="eventType">
              <div className="space-y-4">
                <label className={clsx('block text-lg', {
                  'text-back': isRed,
                  'text-crred': !isRed
                })}>Tipo de evento</label>
                <select
                  {...register('eventType', { required: true })}
                  className={clsx(inputClasses, 'appearance-none bg-transparent')}
                >
                  <option value="">Seleccione tipo...</option>
                  <option value="boda">Boda</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="aniversario">Aniversario</option>
                </select>
              </div>
            </Reveal>
          )
        case 'tourTime':
          return (
            <Reveal key="tourTime">
              <div className="space-y-4">
                <label className={clsx('block text-lg', {
                  'text-back': isRed,
                  'text-crred': !isRed
                })}>Horario preferido</label>
                <select
                  {...register('tourTime', { required: true })}
                  className={clsx(inputClasses, 'appearance-none bg-transparent')}
                >
                  <option value="">Seleccione horario...</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                </select>
              </div>
            </Reveal>
          )
        default:
          return null
      }
    }) || null
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      <Reveal>
        <div className="space-y-4">
          <label className={clsx('block text-lg', {
            'text-back': isRed,
            'text-crred': !isRed
          })}>Nombre completo</label>
          <input
            {...register('name', { required: true })}
            className={inputClasses}
            placeholder="Ingrese su nombre completo"
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="space-y-4">
          <label className={clsx('block text-lg', {
            'text-back': isRed,
            'text-crred': !isRed
          })}>Correo electrónico</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className={inputClasses}
            placeholder="Ingrese su correo electrónico"
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="space-y-4">
          <label className={clsx('block text-lg', {
            'text-back': isRed,
            'text-crred': !isRed
          })}>Teléfono</label>
          <input
            type="tel"
            {...register('phone', { required: true })}
            className={inputClasses}
            placeholder="Ingrese su número telefónico"
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="space-y-4">
          <label className={clsx('block text-lg', {
            'text-back': isRed,
            'text-crred': !isRed
          })}>Fecha preferida</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className={inputClasses}
          />
        </div>
      </Reveal>

      {getDynamicFields()}

      <Reveal>
        <div className="space-y-4">
          <label className={clsx('block text-lg', {
            'text-back': isRed,
            'text-crred': !isRed
          })}>Comentarios adicionales</label>
          <textarea
            {...register('comments')}
            className={clsx(inputClasses, 'h-32 resize-none')}
            placeholder="Ingrese cualquier comentario adicional"
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="pt-8">
          <BasicButton 
            type="submit" 
            variant={isRed ? 'transparent-foot' : 'transparent'}
            className={clsx('w-full md:w-auto border text-lg px-8 py-3', {
              'border-back text-back hover:bg-back/10': isRed,
              'border-crred text-crred hover:bg-crred/10': !isRed
            })}
          >
            Enviar reserva
          </BasicButton>
        </div>
      </Reveal>
    </form>
  )
}