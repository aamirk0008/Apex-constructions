import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Lead from '../../../lib/models/Lead';
import { sendLeadNotification } from '../../../lib/mailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, phone, email, city, message, service } = body;

        // Basic validation
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

        // Save to MongoDB
        await connectDB();
        const lead = await Lead.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email?.trim() || undefined,
            city: city?.trim() || undefined,
            message: message?.trim() || undefined,
            source: 'contact_form',
        });

        // Send email notification (non-blocking — don't fail if email fails)
        sendLeadNotification({
            name, phone, email, city, message,
            source: 'contact_form',
        }).catch(err => console.error('Email notification failed:', err));

        return NextResponse.json({ success: true, id: lead._id }, { status: 201 });

    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { success: false, error: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}