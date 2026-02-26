import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
class AddonDynamicTexts {
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine1!: any;
    @Prop({ type: MongooseSchema.Types.Mixed }) textLine2!: any;
}

export type SaaSAddOnDocument = SaaSAddOn & Document;

@Schema({ timestamps: true, collection: 'saas_addons' })
export class SaaSAddOn {
    @Prop({ type: String, required: true, unique: true }) id!: string;
    @Prop({ type: String }) addonName!: string;
    @Prop({ type: String }) addonCode!: string;
    @Prop({ type: String }) addonDisplayText!: string;
    @Prop({ type: String }) price!: string;
    @Prop({ type: MongooseSchema.Types.Mixed }) anchorPrice!: any;
    @Prop({ type: String }) monthlyPrice!: string;
    @Prop({ type: String }) pricingScheme!: string;
    @Prop({ type: String }) unitName!: string;
    @Prop({ type: String }) addonType!: string;
    @Prop({ type: String }) intervalUnit!: string;
    @Prop({ type: String }) description!: string;
    @Prop({ type: String }) detailedDescription!: string;
    @Prop({ type: Number }) addonQuantityType!: number;
    @Prop({ type: Number }) addonCategoryType!: number;
    @Prop({ type: MongooseSchema.Types.Mixed }) featureCode!: any;
    @Prop({ type: AddonDynamicTexts }) addonDynamicTexts!: AddonDynamicTexts;
}

export const SaaSAddOnSchema = SchemaFactory.createForClass(SaaSAddOn);
