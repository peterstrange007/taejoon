import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string; slug: string; tagline: string; description: string;
  price: number; originalPrice?: number; category: string; images: string[];
  specs: string[]; editions: string[]; features: string[];
  inStock: boolean; featured: boolean; createdAt: Date; updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  tagline: { type: String, default: "" }, description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 }, originalPrice: { type: Number, min: 0 },
  category: { type: String, default: "Assistive Technology" },
  images: [{ type: String }], specs: [{ type: String }], editions: [{ type: String }], features: [{ type: String }],
  inStock: { type: Boolean, default: true }, featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
