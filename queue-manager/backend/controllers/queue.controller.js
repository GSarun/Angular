const supabase = require('../config/db');

exports.getQueue = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('queue_items')
            .select('*')
            .order('joinedAt', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { licensePlate, userDetails, lane, status, joinedAt } = req.body;
        const { data, error } = await supabase
            .from('queue_items')
            .insert([{ licensePlate, userDetails, lane, status, joinedAt }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { data, error } = await supabase
            .from('queue_items')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('queue_items')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
