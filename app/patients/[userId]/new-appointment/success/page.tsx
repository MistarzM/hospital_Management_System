import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/patient.actions';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)
    const  user = await getUser(userId);

    Sentry.metrics.set("user_view_appointment-success", user.name)

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href='/'>
                <div className="flex items-center mb-12">
                    <Image
                        src="/assets/images/logo-full.png"
                        height={1200}
                        width={1200}
                        alt="patient"
                        className="h-10 w-fit"
                    />
                    <h1 className="text-blue-500 font-extrabold text-4xl ml-4">EHospital</h1> 
                </div>
            </Link>
            <section className='flex flex-col items-center'>
                <Image
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                />

            <h2 className='header mb-6 max-w-[600px] text-center'>
                Your <span className='text-green-500'>appointment request</span> has been successfully submited!
            </h2>
            <p>We will be in touch shortly to confirm.</p>
            </section>

            <section className='request-details'>
                <p>Requested appointment details:</p>
                <div className='flex items-center gap-3'>
                    <Image
                        src={doctor?.image!}
                        alt="doctor"
                        width={100}
                        height={100}
                        className='size-6'
                    />
                    <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                </div>
                <div className='flex gap-2'>
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt='calendar'
                    />
                    <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </section>

            <Button variant="outline" className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment 
                </Link>
            </Button>

            <p className="copyright py-12">
            © 2025 EHM 
            </p> 
        </div>
    </div>
  )
}

export default Success  