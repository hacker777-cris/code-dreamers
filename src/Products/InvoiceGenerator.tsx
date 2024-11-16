"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Minus,
  Download,
  Eye,
  FilePlus,
  Calendar,
  DollarSign,
  Trash2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  clientName: string;
  clientAddress: string;
  items: InvoiceItem[];
  notes: string;
}

const initialInvoiceData: InvoiceData = {
  invoiceNumber: "",
  date: "",
  dueDate: "",
  companyName: "",
  companyAddress: "",
  clientName: "",
  clientAddress: "",
  items: [{ description: "", quantity: 0, price: 0 }],
  notes: "",
};

export default function EnhancedInvoiceGenerator() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(initialInvoiceData);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 0, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  };

  const generatePDF = async () => {
    const element = document.getElementById("invoice-preview");
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    }
  };

  const resetInvoice = () => {
    setInvoiceData(initialInvoiceData);
    setPreviewMode(false);
    setShowInvoice(false);
  };

  if (!showInvoice) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={() => setShowInvoice(true)}
            size="lg"
            className="text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FilePlus className="mr-2 h-6 w-6" /> Create New Invoice
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-white bg-opacity-80 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              Invoice Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!previewMode ? (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="invoiceNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      Invoice Number
                    </Label>
                    <Input
                      id="invoiceNumber"
                      name="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={invoiceData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="dueDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="companyName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={invoiceData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="companyAddress"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company Address
                    </Label>
                    <Textarea
                      id="companyAddress"
                      name="companyAddress"
                      value={invoiceData.companyAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="clientName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Client Name
                    </Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      value={invoiceData.clientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="clientAddress"
                      className="text-sm font-medium text-gray-700"
                    >
                      Client Address
                    </Label>
                    <Textarea
                      id="clientAddress"
                      name="clientAddress"
                      value={invoiceData.clientAddress}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">
                    Items
                  </Label>
                  {invoiceData.items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg shadow"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        className="flex-grow"
                      />
                      <Input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            Number(e.target.value),
                          )
                        }
                        className="w-24"
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "price",
                            Number(e.target.value),
                          )
                        }
                        className="w-24"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addItem}
                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className="text-sm font-medium text-gray-700"
                  >
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={invoiceData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </form>
            ) : (
              <div
                id="invoice-preview"
                className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">
                      Invoice
                    </h1>
                    <p className="text-gray-600">{invoiceData.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-gray-800">
                      {invoiceData.companyName}
                    </p>
                    <p className="text-gray-600 whitespace-pre-line">
                      {invoiceData.companyAddress}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      Bill To:
                    </h2>
                    <p className="font-medium text-gray-800">
                      {invoiceData.clientName}
                    </p>
                    <p className="text-gray-600 whitespace-pre-line">
                      {invoiceData.clientAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-2">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">
                        Date: {invoiceData.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">
                        Due Date: {invoiceData.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-2 text-gray-600">
                        Description
                      </th>
                      <th className="text-right py-2 text-gray-600">
                        Quantity
                      </th>
                      <th className="text-right py-2 text-gray-600">Price</th>
                      <th className="text-right py-2 text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-2 text-gray-800">
                          {item.description}
                        </td>
                        <td className="text-right py-2 text-gray-800">
                          {item.quantity}
                        </td>
                        <td className="text-right py-2 text-gray-800">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="text-right py-2 text-gray-800">
                          ${(item.quantity * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mb-8">
                  <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>USD</span>
                    </div>
                  </div>
                </div>
                {invoiceData.notes && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                      Notes:
                    </h2>
                    <p className="text-gray-600 whitespace-pre-line">
                      {invoiceData.notes}
                    </p>
                  </div>
                )}
                <div className="text-center text-gray-500 text-sm">
                  Thank you for your business!
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-100 rounded-b-lg p-4">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              {previewMode ? (
                <Eye className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {previewMode ? "Edit" : "Preview"}
            </Button>
            <Button
              onClick={generatePDF}
              disabled={!previewMode}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
            >
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={resetInvoice}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create New Invoice
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
