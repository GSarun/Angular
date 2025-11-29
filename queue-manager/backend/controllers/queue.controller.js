const supabase = require('../config/db');
const asyncHandler = require('../middlewares/asyncHandler');

exports.getQueue = asyncHandler(async (req, res) => {
    const { data, error } = await supabase
        .from('queue_items')
        .select('*')
        .order('joinedAt', { ascending: true });

    if (error) throw error;
    res.json(data);
});

exports.addItem = asyncHandler(async (req, res) => {
    const { licensePlate, licensePlateProvince, userDetails, lane, status, joinedAt } = req.body;
    const { data, error } = await supabase
        .from('queue_items')
        .insert([{ licensePlate, licensePlateProvince, userDetails, lane, status, joinedAt }])
        .select();

    if (error) throw error;
    res.status(201).json(data[0]);
});

exports.updateItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const { data, error } = await supabase
        .from('queue_items')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) throw error;
    res.json(data[0]);
});

exports.deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('queue_items')
        .delete()
        .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Item deleted successfully' });
});
