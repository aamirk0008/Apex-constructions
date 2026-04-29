import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Lead from '../../../lib/models/Lead';
import { sendLeadNotification } from '../../../lib/mailer';

// Helper — same fmt logic as CostEstimator
function calcEstimate(type, area, quality, city) {
    const BASE_RATES = {
        residential: { basic: 1600, standard: 2100, premium: 2900 },
        commercial: { basic: 1900, standard: 2500, premium: 3400 },
        retail: { basic: 1750, standard: 2300, premium: 3100 },
        renovation: { basic: 900, standard: 1400, premium: 2000 },
    };
    const CITY_MULT = {
        mumbai: 1.35, delhi: 1.25, bangalore: 1.20, pune: 1.15,
        hyderabad: 1.10, ahmedabad: 1.05, surat: 1.02, indore: 1.00,
        bhopal: 0.98, lucknow: 0.97, jaipur: 1.00, nagpur: 0.97, other: 0.95,
    };
    const rate = BASE_RATES[type]?.[quality] ?? 2000;
    const multiplier = CITY_MULT[city] ?? 1.0;
    const base = rate * area * multiplier;
    return { low: Math.round(base * 0.9), mid: Math.round(base), high: Math.round(base * 1.15) };
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { type, area, quality, city, contact, source } = body;
        const { name, phone, email } = contact || {};

        if (!name?.trim() || !phone?.trim()) {
            return NextResponse.json(
                { success: false, error: 'Name and phone are required.' },
                { status: 400 }
            );
        }

        const estimate = calcEstimate(type, area, quality, city);

        await connectDB();
        const lead = await Lead.create({
            name: name.trim(),
            phone: phone.trim(),
            email: email?.trim() || undefined,
            city: city || undefined,
            source: source || 'estimator',
            projectType: type,
            area: area,
            quality: quality,
            estimateLow: estimate.low,
            estimateMid: estimate.mid,
            estimateHigh: estimate.high,
        });

        // Email notification
        sendLeadNotification({
            name, phone, email, city,
            source: 'estimator',
            projectType: type,
            area, quality,
            estimateMid: estimate.mid,
        }).catch(err => console.error('Email notification failed:', err));

        return NextResponse.json({ success: true, id: lead._id, estimate }, { status: 201 });

    } catch (err) {
        console.error('Lead save error:', err);
        return NextResponse.json(
            { success: false, error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}