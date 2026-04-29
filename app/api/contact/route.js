import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, message, service } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }
    if (phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    await connectDB();

    await Lead.create({
      name:    name.trim(),
      phone:   phone.trim(),
      email:   email?.trim()   || undefined,
      city:    city?.trim()    || undefined,
      message: message?.trim() || undefined,
      service: service         || undefined,
      source:  'contact_form',
      status:  'new',
    });

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}