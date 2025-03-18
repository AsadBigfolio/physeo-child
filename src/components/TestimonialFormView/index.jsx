import React from 'react';
import TextInput from "@/components/InputFields/Textinput";
import MediaInput from "@/components/InputFields/MediaInput";
import SelectInput from "@/components/InputFields/SelectInput";
import Card from "@/components/UI/Card";
import TextAreaInput from '../InputFields/TextAreaInput';
import { useTestimonialStore } from '@/providers/TestimonialProvider';

const TestimonialFormView = ({ formattedErrors }) => {
    const { testimonial, updateTestimonial } = useTestimonialStore();

    const handleRatingChange = (e) => {
        updateTestimonial({ rating: parseInt(e.target.value, 10) });
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-3">
                <TextInput
                    label="Name"
                    placeholder="Name"
                    type="text"
                    error={formattedErrors.userName}
                    value={testimonial.userName}
                    onChange={(e) => updateTestimonial({ userName: e.target.value })}
                />
                <TextAreaInput
                    label="Message"
                    name="message"
                    placeholder="Message"
                    value={testimonial.message}
                    error={formattedErrors.message}
                    onChange={(e) => updateTestimonial({ message: e.target.value })}
                />
                <MediaInput
                    label="Image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    type="text"
                    value={testimonial.image}
                    defaultMedia={testimonial.image}
                    error={formattedErrors.image}
                    onChange={(e) => updateTestimonial({ image: e })}
                />
                <div className="mt-3">
                    <SelectInput
                        label="Status"
                        name="status"
                        placeholder="Active/Inactive"
                        type="text"
                        value={testimonial.status}
                        error={formattedErrors.status}
                        options={[
                            { label: 'Publish', value: 'published' },
                            { label: 'Draft', value: 'draft' },
                        ]}
                        onChange={(e) => updateTestimonial({ status: e.target.value })}
                    />
                </div>
                <div className="mt-3">
                    <label className="text-para-base font-poppins font-semibold mb-[13px]">Rating</label>
                    <div className="flex flex-col space-y-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className="inline-flex items-center justify-between w-10">
                                <span>{rating}</span>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    checked={testimonial.rating === rating}
                                    onChange={handleRatingChange}
                                    className="ml-2 h-5 w-5 border-gray-300 text-[#491a8b] focus:ring-[#491a8b]"
                                    style={{
                                        accentColor: '#491a8b',
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                    {formattedErrors.rating && (
                        <p className="text-red-600 text-sm mt-2">{formattedErrors.rating}</p>
                    )}
                </div>

            </Card>
        </div>
    );
};

export default TestimonialFormView;
